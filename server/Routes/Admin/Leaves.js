const express = require("express")
const LeaveRequest = require("../../Models/leaverequest")
const router = express.Router();
const Emp = require('../../Models/employees');
const Employees = require("../../Models/employees");
const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient
const binary = mongodb.Binary
var ObjectId = require('mongodb').ObjectId;


async function insertFile(file, res) {
  mongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, async (err, client) => {
    if (err) {
      return err
    }
    else {
      let db = client.db('Attendance')
      let collection = db.collection('files')
      try {
        const erwin = await collection.insertOne(file)
      }
      catch (err) {
        console.log('Error while inserting:', err)
      }
      client.close()

    }
  })
}


//Aproved Api leaves for payroll from Asad
router.get('/approved-leaves/:month', async (req, res) => {
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
    const Leaves = await LeaveRequest.aggregate([
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


    console.log("leaves map", i)

      if (i.status == "Approved") {
        function getAllDatesBetween(fromDate, toDate) {
          const datesArray = [];
          const currentDate = new Date(fromDate);
          const toTimestamp = new Date(toDate).getTime();
          while (currentDate <= toTimestamp) {
            datesArray.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
          }
          function createObject(employee, leaveType, reason, Leavestatus, _id, date, status, username, Short_leave, leaveNature) {
            return { employee, leaveType, reason, Leavestatus, _id, date, status, username, Short_leave, leaveNature };
          }
          function createObjectsFromDates(datesArray) {
            const objectsArray = [];
            for (let j = 0; j < datesArray.length; j++) {
              const employee = i.employee[0]
              const leaveType = i.leaveType
              const date = datesArray[j]
              const reason = i.reason
              const Leavestatus = i.status
              const Short_leave = i.Short_leave
              const _id = i._id
              const status = "LWP"
              const Leave_Days = i.Leave_Days


              const username = i.employee[0] && i.employee[0].username
              const leaveNature = i.leaveNature
              const newObject = createObject(employee, leaveType, reason, Leavestatus, _id, date, status, username, Short_leave, leaveNature);
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
    console.log(totaldays,"leaves")
    res.status(200).json({
      Leaves,
      totaldays,
    });
  } catch (error) {

    console.log("error", error)

    res.json({ error: error });
  }
});



//Adding a Calendar
router.post('/addrequest', async (req, res, next) => {
  try {
    let file = {}
    if (req.files) {
      file = { name: req.files.file.name, file: binary(req.files.file.data) }
    }
    const reqLeave = new LeaveRequest({
      leaveType: req.body.leaveType,
      Short_leave: req.body.Short_leave,
      from: req.body.from,
      to: req.body.to,
      reason: req.body.reason,
      status: req.body.status,
      employee: req.body.employee,
      backupresourse: req.body.backupresourse,
      applicationdate: req.body.applicationdate,
      fromTime: req.body.fromTime,
      toTime: req.body.toTime,
      leaveNature: req.body.leaveNature,
      attachment: file,
      Leave_Days: req.body.Leave_Days
    })
    const saveRequest = await reqLeave.save();
    saveRequest && res.status(200).json({ message: "Leave Request", saveRequest })
    try {
      const employe = req.body.employee;
      const updatedLeaves = await Emp.findByIdAndUpdate(employe, {
        $push: { Leaves: reqLeave._id }
      },
        { new: true, useFindAndModify: false }
      );
      updatedLeaves && res.status(200).json({ message: "Success", updatedLeaves })
    } catch (error) {
      next(error)
    }
  } catch (error) {
    next(error)
  }
})



// all leaves request 
router.get('/allForHR/:month/:year', async (req, res, next) => {
  try {


    console.log("allfor hr", req.params)

    const allRequest = await LeaveRequest.find({
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
    }).populate({ path: 'employee', populate: [{ path: 'departments', select: ['departmentname'] }] });
    // const counted = await LeaveRequest.count();
    allRequest && res.status(200).json({ message: "all Leave requests", allRequest })
  } catch (error) {
    next(error);
  }
})




router.get('/all/:id/:month/:year', async (req, res, next) => {
  try {
    const subordinateEmployees = await Employees.find({ supervisors: { $in: req.params.id } })
    let subordinateEmployeesIDs = subordinateEmployees.map(a => a._id);
    console.log("subordinate employees ids", subordinateEmployeesIDs, req.params)
    const allRequest = await LeaveRequest.aggregate(
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
              '$in': [
                '$employee', 
                  // new ObjectId('64b65b0cbfd1a88528ad9e5b'), new ObjectId('64c8ef57acdf99039aa56833')
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
        }
      ]
     )
    // .populate({ path: 'employee', populate: { path: 'departments', select: ['departmentname'] } });
    
    const counted = await LeaveRequest.count();
    allRequest && res.status(200).json({ message: "all Leave requests", allRequest, counted })
  } catch (error) {
    next(error);
  }
})




// Last five leaves of employee

router.get('/lastfive/:id', async (req, res, next) => {
  try {
    const response = await LeaveRequest.find({employee:req.params.id}).sort({applicationdate:-1}).limit(5).populate({ path: 'employee', populate: [{ path: 'departments', select: ['departmentname'] }] });
    console.log("response", response)
    // const emp = await Emp.findById(response.employee._id).populate('departments', 'departmentname')
    // const dep = emp.department
    response && res.status(200).json( response )
  } catch (error) {
    next(error)
  }
})





//only employee can see their leave request
router.get('/:id', async (req, res, next) => {
  try {
    const response = await LeaveRequest.findById(req.params.id).populate({ path: 'employee backupresourse', populate: [{ path: 'departments', select: ['departmentname'] }, { path: 'Leaves' }] });
  
    const emp = await Emp.findById(response.employee._id).populate('departments', 'departmentname')
    const dep = emp.department
    response && res.status(200).json({ message: "Success", response, dep })
  } catch (error) {
    next(error)
  }
})










//update status of leaves
router.put('/:id', async (req, res, next) => {
  try {
    const findLeave = await LeaveRequest.findById(req.params.id)
    const updateStatus = await LeaveRequest.findByIdAndUpdate(req.params.id, {
      $set: { status: req.body.status, supervisorApproval: req.body.supervisorApproval },
    }, { new: true })
    updateStatus && res.status(200).json({ message: "Updated leave", updateStatus })
  } catch (error) {
    next(error)
  }
})



module.exports = router;