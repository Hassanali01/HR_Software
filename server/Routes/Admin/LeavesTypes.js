const Leaves = require("../../Models/leavesTypes");
const express = require("express")
const router = express.Router();


router.post('/addleaves', async (req, res, next) => {
    try {
        const leaves = new Leaves({
            leaveType: req.body.leaveType,
            description: req.body.description,
            allocation: req.body.allocation
        })
        const postLeave = await leaves.save();
        postLeave && res.status(200).json({
             message: "Leave added", postLeave
            })
    } catch (error) {
        next(error)
    }
})



router.get('', async (req, res, next) => {
    try {
        const getLeave = await Leaves.find();
        getLeave && res.status(200).json({ 
            message: "leaves", getLeave 
        })
    } catch (error) {
        next(error)
    }
})
module.exports = router