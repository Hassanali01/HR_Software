const mongoose = require("mongoose");

const leavesSchema = mongoose.Schema({
    leaveType: {
        type: String,
        required: true
    },
    description:{
        type:String,
    },
    allocations: {
        type: [{
            company: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'companies',
                required: false

            },
            department: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'departments',
                required: false

        },   
          designation: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'designations',
                    required: false

        },
        allocatedOnce: Boolean

        }],
    },
})

const Leaves = mongoose.model('Leaves', leavesSchema);
module.exports = Leaves