const express = require("express");
const router = express.Router();
const xlsx = require("xlsx");
const fs = require("file-system");
const { json } = require("body-parser");

router.get('/xls',async(req,res)=>{
    console.log("api working......................")
    try{
        const wb = xlsx.readFile('./export.xlsx');
        // console.log(wb.SheetNames);
        // console.log(wb.Workbook)
        res.send(wb.Sheets)
        fs.writeFileSync("./ecxeljson.json",JSON.stringify(wb))
         
    }catch(error){
         console.log(error)
         res.send(error)
    }
    
})

module.exports = router;