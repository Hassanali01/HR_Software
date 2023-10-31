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
    allocations: 
         [{

            company: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Company',
                required: false
            },
            department: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Departments',
                required: false

            },
            designation: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Designation',
                required: false

            },
            allocation: Number,
            allocatedOnce: Boolean

 } ],
    

})

const LeavesTypes = mongoose.model('Leaves',leavesSchema);
module.exports = LeavesTypes


