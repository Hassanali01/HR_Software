const dotenv = require('dotenv')
const mongoose = require("mongoose");
const path = require("path")
// const url = "mongodb://localhost:27017/TestHR"
const url = "mongodb://127.0.0.1:27017/Attendance"
// const url = "mongodb://127.0.0.1:27017/Attendance"



//Mongo Connection
const connectDB = async( )=>{
   
     try{
           mongoose.connect(url,{
                 useUnifiedTopology:true,
                 useNewUrlParser:true,
           });
           console.log("Connection Success MongoDb")

     }catch(err){
        console.log('failed' + err)
     }
}
module.exports= connectDB;