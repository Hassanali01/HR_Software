
const express = require('express')
const router = express.Router()
const Employees = require('../Models/Employees')
const Department = require('../Models/departments')
const { createError } = require('../Utils/CreateError')


//for getting All employee
router.get("/", async (req, res, next) => {
  try {
    const employees = await Employees.find().populate([
      { path: 'departments', select: "departmentname" },
      { path: 'work_shift', select : 'shift_name', model: 'addShifts' },
      { path: 'payroll_setup', select : 'title', model: 'payroll-setup' }
    ]);
    const counted = await Employees.count();
    res.status(200).json(
      {
        message: "Employees", employees, counted
      });
  } catch (err) {
    next(err)
  }
});




// get all employees of specified departments
router.get("/employeesofdepartments", async (req, res, next) => {
  try {
    const employees = await Employees.find({ departments: { $in: req.query.departments } });
    res.status(200).json({ message: "Employees", employees });
  } catch (err) {
    next(err)
  }
});


//for deleting an employeee
router.delete("/:id", async (req, res, next) => {
  const employee = await Employees.findById(req.params.id);
  try {
    await Employees.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted...");
    try {
      const deleteOne = await Department.findByIdAndUpdate(
        employee.departments,
        {
          $pull: { employees: { $in: employee._id } }
        }
      );
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error)
  }
});


//for getting specific employee
router.get("/:id", async (req, res, next) => {
  try {
    const employee = await Employees.findById(req.params.id).populate([
      {
        path: 'departments Leaves supervisors',
        select: "departmentname",
      },
      {
        path: 'work_shift',
        model: 'addShifts',
        select: 'shift_name'
      },
      {
        path: 'payroll_setup',
        model: 'payroll-setup',
        select: 'title'
      },
      {
        path: 'company',
        model: 'Company',
        select: 'title'
      }
    ]);
    console.log(employee,"...............")
    await employee.populate('Leaves')
    await employee.populate('supervisors')
    const { password, ...others } = employee._doc;
    res.status(200).json(others);
    console.log(others, "other")
  } catch (error) {
    next(error)
  }
});


///updating Employee DATA
router.put("/:id", async (req, res, next) => {
  console.log("update API in hit")
  const { departments, supervisors, ...reqBody } = req.body;
  // console.log(req.body)
  try {
    const updateData = await Employees.findByIdAndUpdate(
      req.params.id,
      {
        $set: { ...reqBody },
      //   $push: { departments: req.body.departments },
      //   $push: { supervisors: req.body.supervisors },
      //   $push: { company: req.body.company }
      },
      { new: true, useFindAndModify: false }
    ).populate('supervisors');
    // console.log(updateData)
    updateData && res.status(200).json({ message: "updated", updateData });
  } catch (error) {
    next(error)
  }
});


router.put('/pull/:id', async (req, res, next) => {
  try {
    const updateData = await Employees.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { departments: { $in: req.body.id } }
      },
    );
    updateData && res.status(200).json({ message: "updated", updateData });
  } catch (error) {
    next(error)
  }
})


module.exports = router