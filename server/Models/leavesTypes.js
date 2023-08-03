const mongoose = require("mongoose");

const leavesSchema = mongoose.Schema({
    leaveType:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
})

const LeavesTypes = mongoose.model('Leaves',leavesSchema);
module.exports = LeavesTypes