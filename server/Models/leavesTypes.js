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
    allocations: {
        type: [{
            company: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'companies'
            },
            department: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'departments'
            },
            designation: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'designations'
            },
            allocation: Number,
            allocatedOnce: Boolean

        }],
    },

})

const LeavesTypes = mongoose.model('Leaves',leavesSchema);
module.exports = LeavesTypes