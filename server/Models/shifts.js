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
        type:Date,
        // require:true
    },
    end_time:{
        type:Date,
        // require:true

    },
    slaps:{
        type:Array
    }



},{timestamps:true})

module.exports = mongoose.model("addShifts",addShifts)

 
