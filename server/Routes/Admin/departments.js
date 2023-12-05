const express = require("express");
const router = express.Router();
const Departments = require('../../Models/departments')
const Employees = require('../../Models/employees');
const { Error } = require("mongoose");


router.get('/', async (req, res, next) => {
    try {
        const departments = await Departments.find().populate('employees');
        const counted = await Departments.count();
        departments && res.status(200).json({ message: "Success", departments, counted })
    } catch (error) {
        next(error)
    }
})



//single department
router.get('/:id', async (req, res, next) => {
    try {
        const department = await Departments.findById(req.params.id).populate('employees');
        department && res.status(200).json({ message: "Success", department })
    } catch (error) {
        next(error)
    }
})


//add a department
router.post('/adddepartment', async (req, res, next) => {
    try {
        const departmetdata = new Departments({
            departmentname: req.body.departmentname,
            description: req.body.description
        })
        const department = await departmetdata.save();
        department && res.status(200).json({ message: "Added Department", department })
    } catch (err) {
        next(err)
        res.status(500).json(err);
    }
})


//update
router.put('/:id', async (req, res, next) => {
    const emplId = req.body.id
    try {
        const updateDep = await Departments.findByIdAndUpdate(req.params.id, {
            $push: { employees: emplId }
        }, { new: true, useFindAndModify: false });
        updateDep && res.status(200).json({ message: "Success", updateDep })
    } catch (error) {
        next(error)
    }
})



//delete employee from department
router.put('/delete/:id', async (req, res, next) => {
    try {
        const department = await Departments.findById(req.params.id);
        const update = await Departments.findByIdAndUpdate(req.params.id, {
            $pull: { employees: { $in: req.body.id } }
        })
        update && res.status(200).json({ messgae: "Updated List of employees", update })
    } catch (error) {
        next(error)
    }
})



//delete department
router.delete('/:id', async (req, res, next) => {
    try {
        await Departments.findById(req.params.id)
        const deletee = await Departments.findByIdAndDelete(req.params.id)
        deletee && res.status(200).json({ messgae: "Deleted", deletee })
    } catch (error) {
        next(error)
    }
})


//Add Employee to a department 
router.put('/:id/addemployee', async (req, res, next) => {
    try {
        const department = await Departments.findByIdAndUpdate(req.params.id, {
            $push: { employees: req.body.id }
        }, { new: true, useFindAndModify: false })
        department && res.status(200).json({ message: "Sucessfully Added Employee", department })
    } catch (error) {
        next(error)
    }
})


/// department Info 
router.get('/get/info', async (req, res, next) => {
    try {
        const depwiseemployees = await Departments.aggregate([
            {
                '$project': {
                    'employees': {
                        '$size': '$employees'
                    },
                    'departmentname': 1
                }
            }
        ])
        depwiseemployees && res.status(200).json({ message: "Success", depwiseemployees })
    } catch (error) {
        next(error)
    }
})
module.exports = router