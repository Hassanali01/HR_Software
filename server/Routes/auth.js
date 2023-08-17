const express = require("express");
const router = express.Router();
const { createError } = require("../Utils/CreateError");
const Employees = require("../Models/Employees");
const Department = require('../Models/departments')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


router.post("/register", async (req, res, next) => {
  try {
    // for password encryption
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    const employee = new Employees({
      //personal information
      profilepic: req.body.profilepic,
      company_payroll: req.body.company_payroll,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      religion: req.body.religion,
      martialStatus: req.body.martialStatus,
      cnic: req.body.cnic,
      dob: req.body.dob,
      gender: req.body.gender,
      //contact information
      primaryemail: req.body.primaryemail,
      secondaryemail: req.body.secondaryemail,
      password: hashedPass,
      primaryphone: req.body.primaryphone,
      secondaryphone: req.body.secondaryphone,
      //address and region
      permanentaddress: req.body.permanentaddress,
      temporaryaddress: req.body.temporaryaddress,
      country: req.body.country,
      province: req.body.province,
      city: req.body.city,
      postalCode: req.body.postalCode,
      //employement history
      employementhistory: req.body.employementhistory,
      //education history
      educationdetails: req.body.educationdetails,
      //administartion
      company: req.body.company,
      designation: req.body.designation,
      departments: req.body.departments,
      employementstatus: req.body.employementstatus,
      jobtitle: req.body.jobtitle,
      joiningdate: req.body.joiningdate,
      profilepic: req.body.profilepic,
      terminationdate: req.body.terminationdate,
      terminationreason: req.body.terminationreason,
      employeementstatus: req.body.employeementstatus,
      work_shift: req.body.work_shift,
      //bank information
      bankname: req.body.bankname,
      paymentmode: req.body.paymentmode,
      accounttitle: req.body.accounttitle,
      accountno: req.body.accountno,
      IBAN: req.body.IBAN,
      swiftcode: req.body.swiftcode,
      currentSalary: req.body.currentSalary,
      ERCode: req.body.ERCode,
      branchcode: req.body.branchcode,
      // bankname:req.body.bankname,
      isAdmin: req.body.isAdmin,
      emp_id: req.body.emp_id,
      supervisors: req.body.supervisors
    });

    const user = await employee.save();
    user && res.status(200).json(user);
    try {
      const depId = req.body.departments;
      const updateDep = await Department.findByIdAndUpdate(
        depId,
        {
          $push: { employees: user._id },
        },
        { new: true, useFindAndModify: false }
      );
    } catch (error) {
    }
  } catch (err) {
    next(err);
  }
});




router.post("/login", async (req, res, next) => {
  try {
    const user = await Employees.findOne({
      username: req.body.username,
    });
    await user.populate('departments', 'departmentname')
    await user.populate('Leaves')
    if (!user) {
      return next(createError(404, "User Not found"));
    }
    const comparePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!comparePassword) {
      return next(createError(404, "Wrong Credientials"));
    }
    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET
    );
    const { password, isAdmin, _id, firstname, departments } = user._doc;
    res
      .cookie("access_Token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .status(200)
      .json({ isAdmin, token, id: _id, firstname: firstname, departments: departments });
  } catch (error) {
    next(error);
  }
});


module.exports = router;
