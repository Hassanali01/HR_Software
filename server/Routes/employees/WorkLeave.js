const express = require("express")
const WorkLeave = require("../../Models/WorkLeave")
const router = express.Router();
const employees = require('../../Models/employees')
const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient


// all leaves request 
router.get('/allWorkLeave', async (req, res, next) => {
    try {
        const allRequest = await WorkLeave.find().populate('employee');
        allRequest && res.status(200).json({
            message: "all Leave requests", allRequest
        });
    } catch (error) {
        next(error);
    }
})




function insertFile(file, res) {
    mongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (err, client) => {
        if (err) {
            return err
        }
        else {
            let db = client.db('Attendence')
            let collection = db.collection('files')
            try {
                collection.insertOne(file)
            }
            catch (err) {
            }
            client.close()
            res.redirect('/')
        }
    })
}


router.post('/', async (req, res, next) => {
    console.log("add workleave ", req.body)
    try {
        const reqLeave = new WorkLeave({
            workabsence: req.body.workabsence,
            from: req.body.from,
            to: req.body.to,
            description: req.body.description,
            task: req.body.task,
            Project: req.body.Project,
            location: req.body.location,
            Workstatus: req.body.Workstatus,
            status: req.body.status,
            employee: req.body.employee,
            applicationdate: req.body.applicationdate,
            assignedBy: req.body.assignedBy,
            fromTime: req.body.fromTime,
            toTime: req.body.toTime,
            leave_status: req.body.leave_status,
            placeToVisit: req.body.placeToVisit,
            reasonToVisit: req.body.reasonToVisit,
            remarks: req.body.remarks,
            personToMeet: req.body.personToMeet,
            meterStartReading: req.body.meterStartReading,
            meterEndReading: req.body.meterEndReading,
            overallRemarks: req.body.overallRemarks,
        })
        const leaverequest = await reqLeave.save()
        leaverequest && res.status(200).json({ message: "Leave Request", leaverequest });
        try {
            const emp_id = req.body.employee;
            if (!emp_id) {
                // next(createError(404, "user not found"))
            }
            const update = await employees.findByIdAndUpdate(emp_id, {
                $push: { Leaves: reqLeave._id }
            },
                { new: true, useFindAndModify: false })
        } catch (error) {
            console.log("error", error)
            // next(error)
        }
    } catch (error) {
        console.log("error ", error)
        // next(error)
    }
})


// get api for workleave
router.get('/:month', async (req, res) => {
    let demo = req.params.month
    let no = 0
    if (demo == "January") {
        no = 1;
    }
    else if (demo == "February") {
        no = 2;
    } else if (demo == "March") {
        no = 3;
    } else if (demo == "April") {
        no = 4;
    } else if (demo == "May") {
        no = 5;
    } else if (demo == "June") {
        no = 6;
    } else if (demo == "July") {
        no = 7;
    } else if (demo == "August") {
        no = 8;
    } else if (demo == "September") {
        no = 9;
    } else if (demo == "Octobar") {
        no = 10;
    } else if (demo == "November") {
        no = 11;
    } else if (demo == "December") {
        no = 12;
    }
    try {
        const Leaves = await WorkLeave.aggregate([
            [
                {
                    '$set': {
                        'month': [
                            {
                                '$month': '$from'
                            }, {
                                '$month': '$to'
                            }
                        ]
                    }
                }, {
                    '$match': {
                        'month': {
                            '$in': [
                                no
                            ]
                        }
                    }
                },
                {
                    '$lookup': {
                        'from': 'employees',
                        'localField': 'employee',
                        'foreignField': '_id',
                        'as': 'employee'
                    }
                }
            ]
        ])
        const totaldays = [];
        await Leaves.map((i) => {

            if (i.status == "Approved") {
                function getAllDatesBetween(fromDate, toDate) {
                    const datesArray = [];
                    const currentDate = new Date(fromDate);
                    const toTimestamp = new Date(toDate).getTime();
                    while (currentDate <= toTimestamp) {
                        datesArray.push(new Date(currentDate));
                        currentDate.setDate(currentDate.getDate() + 1);
                    }
                    function createObject(employee, workabsence, description, Workstatus, _id, applicationdate, status, username, location, Project,  task ,date , Short_leave) {
                        return { employee, workabsence, description, Workstatus, _id, applicationdate, status, username, location, Project, task ,date, Short_leave};
                    }

                    function createObjectsFromDates(datesArray) {
                        const objectsArray = [];
                        for (let j = 0; j < datesArray.length; j++) {

                            const employee = i.employee[0]
                            const workabsence = i.workabsence
                            const date = datesArray[j]
                            const description = i.description
                            const Workstatus = i.Workstatus
                            const location = i.location
                            const _id = i._id
                            const status = "LWP"
                            const Leave_Days = i.Leave_Days
                            const applicationdate = i.applicationdate
                            const Project = i.Project
                            const task = i.task
                            const username = i.employee[0] && i.employee[0].username
                            const leaveNature = i.leaveNature
                            const Short_leave = i.Short_leave
                            
                            const newObject = createObject(employee, workabsence, description, Workstatus, _id, applicationdate, status, username, location, Project, task, date,Short_leave);
                            totaldays.push(newObject)
                            objectsArray.push(newObject);
                        }
                        return objectsArray;
                    }
                    const userDates = datesArray
                    const dynamicObjectsArray = createObjectsFromDates(datesArray);
                    return dynamicObjectsArray;
                }
                const fromDate = i.from;
                const toDate = i.to;
                const allDates = getAllDatesBetween(fromDate, toDate);
                return allDates
            }
        })

        console.log("totaldays", totaldays)

        res.status(200).json({
            Leaves,
            totaldays,
        });
    } catch (error) {

        console.log("error", error)
        res.json({ error: error });
    }
});



//update status of workleaves
router.put('/:id', async (req, res, next) => {
    try {
        const findLeave = await WorkLeave.findById(req.params.id)
        const updateStatus = await WorkLeave.findByIdAndUpdate(req.params.id, {
            $set: { status: req.body.status, supervisorApproval: req.body.supervisorApproval },
        }, { new: true })
        updateStatus && res.status(200).json({ message: "Updated leave", updateStatus })
    } catch (error) {
        next(error)
    }
})



module.exports = router;