const express = require("express");
const router = express.Router();
const Holiday = require('../Models/holidays')
const Calendar = require("../Models/Calendar")
const moment = require('moment-timezone');
const moment1 = require('moment');
const mongoose = require('mongoose');

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
      from: req.body.from,
      to: req.body.to,
      type: req.body.type,
      // calendarId: req.body.calendarId
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
    const detail = await Holiday.find({})
    const dates = [];
    await detail.map((i) => {
      const start = moment1(i.from, 'YYYY-MM-DD');
      const end = moment1(i.to, 'YYYY-MM-DD');
      const title = i.title
      const id = i._id
      const current = moment1(start);
      function createObject(current, id, title) {
        return { current, id, title };
      }

      while (current <= end) {
        const newObject = createObject(current.format('YYYY-MM-DD'), id, title);
        dates.push(newObject);
        current.add(1, 'days');
      }
    })
    res.status(200).json({
      dates,
      detail
    }
    );
  } catch (error) {
    res.status(500).json(error);
  }
})



// DELETE a leave entry by ID
router.delete('/:id', async (req, res, next) => {
  console.log("api is hit", req.params._id)
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    // Proceed with findByIdAndDelete
  } else {
    res.status(400).json({ message: 'Invalid ID' });
  }
  try {
    const deletee = await Holiday.findByIdAndDelete(req.params.id)
    deletee && res.status(200).json({ messgae: "Deleted", deletee })
  } catch (error) {
    next(error)
  }
})


module.exports = router;