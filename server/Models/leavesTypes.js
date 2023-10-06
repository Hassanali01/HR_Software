const mongoose = require("mongoose");

const leavesSchema = mongoose.Schema({
    leaveType:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:false
    },
    allocation:{
        type:Number,
        required:true
    },

})

const LeavesTypes = mongoose.model('Leaves',leavesSchema);
module.exports = LeavesTypes