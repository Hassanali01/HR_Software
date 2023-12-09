const express = require("express")
const LeaveRequest = require("../../Models/leaverequest")
const router = express.Router();
const employees = require('../../Models/employees')
const { createError } = require('../../Utils/CreateError')
const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient
const binary = mongodb.Binary


// all leaves request 
router.get('/all', async (req, res, next) => {
    try {
        const allRequest = await LeaveRequest.find().populate('employee');
        allRequest && res.status(200).json({
            message: "all Leave requests", allRequest
        });
    } catch (error) {
        next(error);
    }
})



// API endpoint to get leaves for a specific month
router.get('/onemonthleaves', async (req, res) => {
    try {
        const allRequest = await LeaveRequest.find().populate('employee');
        allRequest && res.status(200).json({
            message: "all Leave requests", allRequest
        });
    } catch (error) {
    }
});


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


router.post('/addrequests', async (req, res, next) => {



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
            fromTime: req.body.fromTime,
            toTime: req.body.toTime,
            leaveNature: req.body.leaveNature
        })
        const leaverequest = await reqLeave.save()
        leaverequest && res.status(200).json({ message: "Leave Request", leaverequest });
        try {
            const emp_id = req.body.employee;
            if (!emp_id) {
                next(createError(404, "user not found"))
            }
            const update = await employees.findByIdAndUpdate(emp_id, {
                $push: { Leaves: reqLeave._id }
            },
                { new: true, useFindAndModify: false })
        } catch (error) {
            next(error)
        }
    } catch (error) {
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
    }
})


module.exports = router;