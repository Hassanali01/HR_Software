const mongoose = require("mongoose");

const PayperiodSchema = mongoose.Schema({
   paycycle:{
     type:mongoose.Schema.Types.ObjectId,
     ref:'PayCycle'
   },
  start: {
    type: String,
    required: true,
  },
  end: {
    type: String,
    required: true,
  },
});

const PayPeriod = mongoose.model("PayPeriod", PayperiodSchema);
module.exports = PayPeriod;
