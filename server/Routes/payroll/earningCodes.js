const express = require("express");
const router = express.Router();
const { createError } = require('../../Utils/CreateError')
const ErCodes = require("../../Models/payroll/earningcodes");


router.post('/earningcode', async (req, res, next) => {
    try {
        const ERCcode = new ErCodes({
            code: req.body.code,
            codetype: req.body.codetype,
            description: req.body.description
        })
        const ERCcodeSave = await ERCcode.save();
        ERCcodeSave && res.status(200).json({ message: "Succesfully added", ERCcodeSave })
    }
    catch (error) {
        next(error)
    }
})



router.get('/earningcode', async (req, res, next) => {
    try {
        const ERC = await ErCodes.find();
        ERC && res.status(200).json({ message: "Earning codes", ERC })
    }
    catch (error) {
        next(error)
    }
})



router.get('/earningcode/:id', async (req, res, next) => {
    try {
        const ERC = await ErCodes.findById(req.params.id);
        ERC && res.status(200).json({ message: "Earning codes", ERC })
    }
    catch (error) {
        next(error)
    }
})


router.put('/earningcode/:id', async (req, res, next) => {
    try {
        const ERC = await ErCodes.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        ERC && res.status(200).json({ message: "Sucessfully updated", ERC })
    } catch (error) {
        next(error)
    }
})


router.delete('/earningcode/:id', async (req, res, next) => {
    try {
        const ERC = await ErCodes.findByIdAndDelete(req.params.id)
        ERC && res.status(200).json({ message: "Sucessfully deleted", ERC })
    } catch (error) {
        next(error)
    }
})



module.exports = router