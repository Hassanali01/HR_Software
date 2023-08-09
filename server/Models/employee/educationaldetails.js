const mongooes = require("mongoose");
const educationSchema = new mongooes.Schema({
    Degreetitle:{
        type:String,
        required:true
    },
    institute:{
        type:String,
      required:true
    },
    from:{
        type:Date,        
    },
    to:{
        type:Date,
    },
    status:{
        type:String,
        required:true
    },
    employeeId:{
         type: mongooes.Schema.Types.ObjectId, 
         ref: 'Employee'
    },
})
const Education = mongooes.model("Education",educationSchema)
module.exports= Education;