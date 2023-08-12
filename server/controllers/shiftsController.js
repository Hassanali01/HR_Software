const { default: mongoose } = require('mongoose')
const Shifts = require('../Models/shifts')


//for create shifts
const addShifts = async (req, res) => {
    console.log("Api hit for shift")
    const { shift_name, description, start_time, end_time, slaps } = req.body
    try {
        const shifts = await Shifts.create({ shift_name, description, start_time, end_time, slaps })
        console.log(shifts)
        res.status(200).json(shifts)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// for get all shifts
const allShifts = async (req, res) => {
    try {
        const shifts = await Shifts.find().sort({ createdAt: -1 })
        res.status(200).json(shifts)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//for get specific shifts
const getSpecificShift = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "No record found" })
    }
    try {
        const shifts = await Shifts.findById({ _id: id })
        res.status(200).json(shifts)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


//for delete shifts
const deleteShifts = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "No record found" })
    }
    try {
        const shifts = await Shifts.findByIdAndDelete({ _id: id })
        res.status(200).json(shifts)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


module.exports = { addShifts, getSpecificShift, allShifts, deleteShifts }