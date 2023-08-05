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
        require:true
    },
    end_time:{
        type:Date,
        require:true

    },
    slaps:{
<<<<<<< HEAD

        type: Array
    }
=======
        type:Array
    }


>>>>>>> f0ec2608b500e15c9a460165bd2e8f2552b3d0cf

},{timestamps:true})

module.exports = mongoose.model("addShifts",addShifts)

 
