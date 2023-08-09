const express = require("express");
const router = express.Router();
const Ecxel = require("../Models/Ecxel");
const xlsx = require("xlsx");



router.get('/ecxelimport', async (req, res) => {
    try {
        const abc = await Ecxel.find()
        res.status(200).json(abc);
    } catch (error) {
        res.status(500).json(err)
    }
})



router.post('/postimport', async (req, res) => {
    try {
        const ecxel = new Ecxel(req.body);
        const user = await ecxel.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
})



module.exports = router