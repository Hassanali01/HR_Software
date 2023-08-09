const mongooes = require("mongoose");
const AutoIncrement =  require('mongoose-sequence')(mongooes);
const HolidaySchema = new mongooes.Schema({
    srno:Number,
    title:{
        type:String,
        required:true
    },
    date:{
        type:Date,

    },
    type:{
        type:String,
    },
    calendarId:{
         type: mongooes.Schema.Types.ObjectId, 
         ref: 'Calendar'
    },
})
HolidaySchema.plugin(AutoIncrement, {inc_field: 'srno'});

const Holiday = mongooes.model("Holidays",HolidaySchema)
module.exports= Holiday;