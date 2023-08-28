const { default: mongoose } = require('mongoose')
const Shifts = require('../Models/shifts')


//for create shifts
const addShifts = async (req, res) => {
    const { shift_name, description, start_time, end_time, slabs,early_leave_slabs } = req.body
    try {
        const shifts = await Shifts.create({ shift_name, description, start_time, end_time, slabs,early_leave_slabs })
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


// Update employee shift by ID
const updateShift = async (req, res) => {
    try {
        const updatedFields = {};

        if (req.body.slabs && req.body.slabs.length > 0) {
            updatedFields.slabs = {
                later_than: req.body.slabs[0].later_than,
                deduction: req.body.slabs[0].deduction,
            };
        }

        if (req.body.early_leave_slabs && req.body.early_leave_slabs.length > 0) {
            updatedFields.early_leave_slabs = {
                early_leave_time: req.body.early_leave_slabs[0].early_leave_time,
                deduction: req.body.early_leave_slabs[0].deduction,
            };
        }

        const updatedItem = await Shifts.findByIdAndUpdate(
            req.params.id,
            { $push: updatedFields },
            { new: false }
        );

        return res.status(200).json({ message: 'Shift updated successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while updating the shift' });
    }
};





module.exports = { addShifts, getSpecificShift, allShifts, deleteShifts, updateShift }