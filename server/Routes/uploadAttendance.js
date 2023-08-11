const express = require("express");
const router = express.Router();
const Departments = require('../Models/departments')
const { createError } = require('../Utils/CreateError')
const Positions = require("../Models/positions");
const xlsx = require("xlsx");
const fs = require("file-system");
const { json } = require("body-parser");
const Attendance = require('../Models/attendance')


router.get('/alluserattendance', async (req, res) => {
    try {
        const abc = await Attendance.find().populate("employee", "username")
        res.status(200).json(abc);
    } catch (error) {
        res.status(500).json(err)
    }
})



router.get('/monthattendance/:month', async (req, res) => {

    try {
        const abc = await Attendance.find({ month: req.params.month }).populate([
            {
                path: 'employee',
                model: 'Employees',
                select: 'username emp_id company_payroll shift_id joiningdate designation date_of_resignation',
                populate: [{
                    path: 'departments',
                    model: 'Departments',
                    select: 'departmentname',
                },
                {
                    path: 'shift_id',
                    model: 'addShifts'
                }
                ],
            },
        ])

        res.status(200).json(abc);
    } catch (error) {
        res.status(500).json(error)
    }
})




router.get('/AttendanceForDate', async (req, res) => {
    try {
        const abc = await Attendance.find({ date: req.query.date }).populate({ path: "employee", select: ['username', 'emp_id', 'departments'], populate: { path: "departments", model: "Departments", select: ["departmentname"] } })
        res.status(200).json(abc);
    } catch (error) {
        res.status(500).json(err)
    }
})



router.get('/currentUserAttendance', async (req, res) => {
    try {
        const abc = await Attendance.find({ date: req.query.date, employee: req.query.employee })
        res.status(200).json(abc);
    }
    catch (error) {
        res.status(500).json(err)
    }
})



router.post('/postimport/attendance', async (req, res) => {
    try {
        const Data = req.body
        const attendance = await Attendance.insertMany(Data, { ordered: false });
        res.status(200).json(attendance, Data, { ordered: false });
    } catch (err) {
        res.status(500).json(err);
    }
})



router.get('/xls//attendance', async (req, res) => {
    try {
        const wb = xlsx.readFile('./export.xlsx');
        res.send(wb.Sheets)
        fs.writeFileSync("./ecxeljson.json", JSON.stringify(wb))
    } catch (error) {
        res.send(error)
    }
})



router.delete('/attendance/all', async (req, res, next) => {
    try {
        const dell = await Attendance.deleteMany()
        dell && res.status(200).json({ message: "Successfully Deleted" })
    } catch (error) {
        next(error)
    }
})




router.post('/userattendance', async (req, res, next) => {
    try {
        const userattendance = new Attendance({
            employee: req.body.employee,
            month: req.body.month,
            date: req.body.date,
            Name: req.body.Name,
            in: req.body.In,
            out: req.body.out,
            status: req.body.status
        })
        const attendance = await userattendance.save();
        attendance && res.status(200).json({ message: 'Successfully posted ', attendance })
    } catch (err) {
        next(err)
    }
})




router.put('/updateuserattendance/:id', async (req, res, next) => {
    try {
        const userattendance = await Attendance.findOneAndUpdate({ employee: req.params.id, date: req.body.date }, { $set: req.body }, { upsert: true, new: true, setDefaultsOnInsert: true });
        await userattendance && res.status(200).json({ message: 'Successfully updated ', userattendance })
    } catch (error) {
        next(error)
    }
})



module.exports = router