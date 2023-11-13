const express = require("express")
const WorkLeave = require("../../Models/WorkLeave")
const router = express.Router();
const employees = require('../../Models/employees')
const mongodb = require('mongodb')
const Employees = require('../../Models/employees');
const mongoClient = mongodb.MongoClient

var ObjectId = require('mongodb').ObjectId;





// all leaves request 
router.get('/allWorkLeave/:month/:year', async (req, res, next) => {
    try {
      console.log("allfor hr", req.params)
      const allRequest = await WorkLeave.find({
        $expr: {
          $or: [
           { $and: [
              {
                "$eq": [
                  {
                    "$month": "$from"
                  },
                  parseInt(req.params.month)
                ]
              },
              {
                "$eq": [
                  {
                    "$year": "$from"
                  },
                  parseInt(req.params.year)
                ]
              }
            ]},
              {  $and: [
            {
              "$eq": [
                {
                  "$month": "$to"
                },
                parseInt(req.params.month)
              ]
            },
            {
              "$eq": [
                {
                  "$year": "$to"
                },
                parseInt(req.params.year)
              ]
            }
          ]
        }
          ]
        }
      }).populate({ path: 'employee assignedBy', populate: [{ path: 'departments', select: ['departmentname'] }] });
      allRequest && res.status(200).json({ message: "all Leave requests", allRequest })
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
    try {
        const reqLeave = new WorkLeave({
            workabsence: req.body.workabsence,
            from: req.body.from,
            to: req.body.to,
            description: req.body.description,
            task: req.body.task,
            project: req.body.project,
            location: req.body.location,
            workStatus: req.body.workStatus,
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
            expense: JSON.parse(req.body.expense)  
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
        }
    } catch (error) {
        console.log("error ", error)
    }
})


// get api for workleave
router.get('/:month', async (req, res) => {
    let demo = req.params.month
    let no = 0
    if (demo == "January") {
        no = 1;
    } else if (demo == "February") {
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
    } else if (demo == "October") {
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
        res.status(200).json({
            Leaves,
            totaldays,
        });
    } catch (error) {
        console.log("error", error)
        res.json({ error: error });
    }
});




// Get all leaves for subordinate employees
router.get('/all/:id/:month/:year', async (req, res, next) => {
    try {
      const subordinateEmployees = await Employees.find({ supervisors: { $in: req.params.id } })
      let subordinateEmployeesIDs = subordinateEmployees.map(a => a._id);
      const allRequest = await WorkLeave.aggregate(
        [
          {
            '$match': {
              '$expr': {
                '$or': [
                  {
                    '$eq': [
                      {
                        '$year': '$from'
                      }, parseInt(req.params.year)
                    ]
                  }, {
                    '$eq': [
                      {
                        'year': '$to'
                      }, parseInt( req.params.year)
                    ]
                  }
                ]
              }
            }
          }, {
            '$match': {
              '$expr': {
                '$or': [
                  {
                    '$eq': [
                      {
                        '$month': '$from'
                      }, parseInt(req.params.month)
                    ]
                  }, {
                    '$eq': [
                      {
                        '$month': '$to'
                      },parseInt(req.params.month)
                    ]
                  }
                ]
              }
            }
          }, {
            '$match': {
              '$expr': {
                '$in': [
                  '$employee', 
                    subordinateEmployeesIDs
                ]
              }
            }
          }, {
            '$lookup': {
              'from': 'employees', 
              'localField': 'employee', 
              'foreignField': '_id', 
              'as': 'employee'
            }
          }, {
            '$unwind': {
              'path': '$employee', 
              'preserveNullAndEmptyArrays': false
            }
          }, {
            '$lookup': {
              'from': 'departments', 
              'localField': 'employee.departments', 
              'foreignField': '_id', 
              'as': 'employee.departments'
            }
          }, {
            '$lookup': {
              'from': 'employees', 
              'localField': 'assignedBy', 
              'foreignField': '_id', 
              'as': 'assignedBy'
            }
          }, {
            '$unwind': {
              'path': '$assignedBy', 
              'preserveNullAndEmptyArrays': false
            }
          }
        ]
       )
      allRequest && res.status(200).json({ message: "all Leave requests", allRequest })
    } catch (error) {
      next(error);
    }
  })



  // Get all work leaves of specific employee
  router.get('/employee/:id/:month/:year', async (req, res, next) => {
    try {
      const allRequest = await WorkLeave.aggregate(
        //  employee: subordinateEmployeesIDs,
        [
          {
            '$match': {
              '$expr': {
                '$or': [
                  {
                    '$eq': [
                      {
                        '$year': '$from'
                      }, parseInt(req.params.year)
                    ]
                  }, {
                    '$eq': [
                      {
                        'year': '$to'
                      }, parseInt( req.params.year)
                    ]
                  }
                ]
              }
            }
          }, {
            '$match': {
              '$expr': {
                '$or': [
                  {
                    '$eq': [
                      {
                        '$month': '$from'
                      }, parseInt(req.params.month)
                    ]
                  }, {
                    '$eq': [
                      {
                        '$month': '$to'
                      },parseInt(req.params.month)
                    ]
                  }
                ]
              }
            }
          }, {
            '$match': {
              '$expr': {
                '$eq': [
                  '$employee', 
                    // new ObjectId('64b65b0cbfd1a88528ad9e5b'), new ObjectId('64c8ef57acdf99039aa56833')
                    new ObjectId(req.params.id)
                ]
              }
            }
          }, {
            '$lookup': {
              'from': 'employees', 
              'localField': 'employee', 
              'foreignField': '_id', 
              'as': 'employee'
            }
          }, {
            '$unwind': {
              'path': '$employee', 
              'preserveNullAndEmptyArrays': false
            }
          }, {
            '$lookup': {
              'from': 'departments', 
              'localField': 'employee.departments', 
              'foreignField': '_id', 
              'as': 'employee.departments'
            }
          }
        ]
       )
      // .populate({ path: 'employee', populate: { path: 'departments', select: ['departmentname'] } });
      
      const counted = await WorkLeave.count();
      allRequest && res.status(200).json({ message: "all Leave requests", allRequest, counted })
    } catch (error) {
      next(error);
    }
  })




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