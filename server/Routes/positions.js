const express = require("express");
const router = express.Router();
const Departments = require('../Models/departments')
const {createError} = require('../Utils/CreateError')
const Positions = require("../Models/positions");
// router.get('/departments',async(req,res,next)=>{
//     try{
//         const departments = await Departments.find();
//         departments && res.status(200).json({message:"Success",departments})
       
//     }catch(error){
//        console.log(error)
//        next(error)
//     }
// })

router.post('/addposition/:id', async (req, res, next) => {
   
    try {
         const getdep = await Departments.find();
         console.log("departments",getdep);
         const selectdepartment = await Departments.findById(req.params.id);
         console.log("selected department",selectdepartment);
         const addPosition = new Positions({
            assignTo:selectdepartment,
            position:req.body.position
         })
         const post  =  await addPosition.save();
         post && res.status(200).json({message:"Added position",post})
       
    } catch (error) {
        console.log(error)
       next(error)
    }

})


module.exports = router