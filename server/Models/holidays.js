const mongooes = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongooes);
const HolidaySchema = new mongooes.Schema({
    srno: Number,
    title: {
        type: String,
        required: true
    },
    from: {
        // type:Date.now(),
        type: Date,
        // required:true                  
    },
    to: {
        type: Date,
        // required:true
    },
    type: {
        type: String,
    },
    // calendarId: {
    //     type: mongooes.Schema.Types.ObjectId,
    //     ref: 'Calendar'
    // },
    status: {
        type: Boolean,
        // required: true
    }
})
HolidaySchema.plugin(AutoIncrement, { inc_field: 'srno' });

const Holiday = mongooes.model("Holidays", HolidaySchema)
module.exports = Holiday;