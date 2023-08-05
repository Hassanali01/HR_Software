const express = require("express")
const LeaveRequest = require("../../Models/leaverequest")
const router = express.Router();
const employees = require('../../Models/Employees')
const { createError } = require('../../Utils/CreateError')
// const mongoClient = mongodb.MongoClient
// const binary = mongodb.Binary
const mongodb = require('mongodb')


const mongoClient = mongodb.MongoClient
const binary = mongodb.Binary


//Adding a Calendar

// all leaves request 
router.get('/all', async (req, res, next) => {
    console.log("in all ")
    try {
        const allRequest = await LeaveRequest.find().populate('employee');
        console.log("in try")
        allRequest && res.status(200).json({ message: "all Leave requests", allRequest });
        console.log("after response")
    } catch (error) {
        next(error);
        console.log(error)
    }
})









// Asad Api start
// API endpoint to get leaves for a specific month
router.get('/onemonthleaves', async (req, res) => {
    try {
        const allRequest = await LeaveRequest.find().populate('employee');
        console.log("in try")
        allRequest && res.status(200).json({ message: "all Leave requests", allRequest });
        console.log("after response")
    } catch (error) {
        
        console.log(error)
    }
});
// Aasad Api End 













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
                console.log('File Inserted')
            }
            catch (err) {
                console.log('Error while inserting:', err)
            }
            client.close()
            res.redirect('/')
        }

    })
}



router.post('/addrequests', async (req, res, next) => {
    console.log("Api Start=================================================================")
    console.log("newreq", req.body)

    try {

        const reqLeave = new LeaveRequest({
            leaveType: req.body.leaveType,
            from: req.body.from,
            to: req.body.to,
            reason: req.body.reason,
            status: req.body.status,
            employee: req.body.employee,
            applicationdate: req.body.applicationdate,
            backupresourse: req.body.backupresourse,
            fromTime:req.body.fromTime,
            toTime:req.body.toTime,
            leaveNature:req.body.leaveNature
        })
        const leaverequest = await reqLeave.save()
        leaverequest && res.status(200).json({ message: "Leave Request", leaverequest });
        console.log(leaverequest)
        try {
            const emp_id = req.body.employee;
            console.log("employee", emp_id)
            if (!emp_id) {
                next(createError(404, "user not found"))
            }
            console.log("employee", emp_id)
            const update = await employees.findByIdAndUpdate(emp_id, {
                $push: { Leaves: reqLeave._id }
            },
                { new: true, useFindAndModify: false })
            console.log("updated employee", update)
        } catch (error) {
            console.log(error, "++++++++++++++++++++++++++++++++++")
            next(error)
        }



    } catch (error) {
        console.log(error)
        next(error)
    }

})



// only employee can see their leave request

router.get('/:id', async (req, res, next) => {
    try {

        const response = await LeaveRequest.findById(req.params.id).populate('employee');
        const emp = await employees.findById(response.employee._id).populate('departments', 'departmentname')
        const dep = emp.department
        response && res.status(200).json({ message: "Success", response, dep })

    } catch (error) {
        next(error)
        console.log(error)
    }
})


module.exports = router;