const { Decimal128 } = require('mongodb')
const mongoose = require ('mongoose')

const Schema = mongoose.Schema

const addShifts = new Schema({

    shift_name:{
        type:String,
        require:true
    },
    description:{
        type:String,
    },
    start_time:{
        type:String,
    },
    end_time:{
        type:String,
    },
    slabs:{
        type:Array,
    },
    early_leave_slabs: {
        type:Array,
    }
},{timestamps:true})

module.exports = mongoose.model("addShifts",addShifts)


 
