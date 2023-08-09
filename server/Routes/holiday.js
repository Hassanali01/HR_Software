const express = require("express");
const router = express.Router();
const Holiday = require('../Models/holidays')
const Calendar = require("../Models/Calendar")
const moment = require('moment-timezone');


router.get('/', async (req, res, next) => {
  try {
    const holidays = await Holiday.find().populate('calendarId')
    holidays && res.status(200).json({ message: "success", holidays })
  } catch (error) {
    next(error)
  }
})


//posting holiday route 
router.post('/addholiday', async (req, res, next) => {
  const utcDate = moment.utc(req.body.date).toDate();
  try {
    const holiday = new Holiday({
      title: req.body.title,
      date: utcDate,
      type: req.body.type,
      calendarId: req.body.calendarId
    })
    const save = await holiday.save();
    const calendarHolidays = await Calendar.findByIdAndUpdate(req.body.calendarId, {
      $push: { holidays: save._id }
    }, { new: true, useFindAndModify: false })
    res.status(200).json({ mesasge: "Success", save, calendarHolidays });
  }
  catch (error) {
    next(error)
  }
})



//getting holiday with associated calendar
router.get("/detail", async (req, res) => {
  try {
    const detail = await Holiday.find({}).populate("calendarId").exec();
    res.status(200).json(detail);
  } catch (error) {
    res.status(500).json(error);
  }
})




module.exports = router;