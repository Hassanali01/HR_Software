const express = require("express");
const router = express.Router();
const Departments = require('../Models/departments')
const Positions = require("../Models/positions");



router.post('/addposition/:id', async (req, res, next) => {
    try {
        const getdep = await Departments.find();
        const selectdepartment = await Departments.findById(req.params.id);
        const addPosition = new Positions({
            assignTo: selectdepartment,
            position: req.body.position
        })
        const post = await addPosition.save();
        post && res.status(200).json({ message: "Added position", post })
    } catch (error) {
        next(error)
    }
})



module.exports = router