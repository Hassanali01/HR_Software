const express = require("express");
const router = express.Router();
const Holiday = require('../Models/holidays')
const Calendar = require("../Models/Calendar")
const moment = require('moment-timezone');

router.get('/',async(req,res,next)=>{
      try{
           const holidays = await Holiday.find().populate('calendarId')
           console.log(holidays)
           holidays && res.status(200).json({message:"success",holidays})
      }catch(error){
        next(error)
      }
})
//posting holiday route 

router.post('/addholiday',async(req,res,next)=>{

  const utcDate = moment.utc(req.body.date).toDate();
      try
      {
       const holiday =  new Holiday({
              title:req.body.title,
              // date: req.body.date,
              // from:req.body.from,
              date:utcDate,
              type:req.body.type,
              calendarId:req.body.calendarId   
       })
       console.log("date you enter",req.body.date)
       //saving holiday
       const save  = await holiday.save();
       const calendarHolidays = await Calendar.findByIdAndUpdate(req.body.calendarId,{
          $push:{holidays:save._id}
       }, { new: true, useFindAndModify: false })
       res.status(200).json({mesasge:"Success",save,calendarHolidays});
      }
      catch(error)
      {
        console.log(error)
        next(error)
      }
})

//getting holiday with associated calendar

router.get("/detail",async(req,res)=>{

  //we use find method to find the doc and populate method to execute the 
  // data assosiated with this table
  try{
    console.log("getting All documents");
   const detail = await Holiday.find({}).populate("calendarId").exec();
   res.status(200).json(detail);

  }catch(error){
      console.log(error);
      res.status(500).json(error);
  }


})





module.exports = router;