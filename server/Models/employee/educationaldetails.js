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
        // type:Date.now(),
        type:Date,
        // required:true                  
    },
    to:{
        type:Date,
        // required:true
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