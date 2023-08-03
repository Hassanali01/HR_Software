const mongoose = require("mongoose");

const EcxelSchema = new mongoose.Schema({
    firstname:{
        type:String,
    },
    lastname:{
        type:String
    },
    city:{
        type:String
    }

})

const Ecxel = mongoose.model("Ecxel",EcxelSchema);
module.exports = Ecxel;