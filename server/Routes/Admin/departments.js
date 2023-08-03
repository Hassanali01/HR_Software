const express = require("express");
const router = express.Router();
const Departments = require('../../Models/departments')
const {createError} = require('../..//Utils/CreateError')
// const Emp = require('../../Models/Users');
const Employees = require('../../Models/Employees');
const { Error } = require("mongoose");
router.get('/',async(req,res,next)=>{
    try{
        const departments = await Departments.find().populate('employees');
        console.log(departments)
        const counted = await  Departments.count();
        // const employess =departments.employees.count()
       
        departments && res.status(200).json({message:"Success",departments,counted})
        
        console.log("Count",counted)
        // console.log("employees in a department",employess)
      
      
    }catch(error){
       console.log(error)
       next(error)
    }
})
//single department
router.get('/:id',async(req,res,next)=>{
    try{
          const department = await Departments.findById(req.params.id).populate('employees');
          department  && res.status(200).json({message:"Success",department})
    }catch(error){
         next(error)
    }
})
//add a department
router.post('/adddepartment', async (req, res, next) => {
   
    try {
         const departmetdata = new Departments( {
            departmentname:req.body.departmentname,
            description: req.body.description

         })
         const department  =  await departmetdata.save();
         department && res.status(200).json({message:"Added Department",department})
       
    } catch (err) {
        console.log(err)
        next(err)
        res.status(500).json(err);
    }

})
//update
router.put('/:id',async(req,res,next)=>{
      
    const emplId = req.body.id
    try{
         const updateDep = await Departments.findByIdAndUpdate(req.params.id,{
            $push:{employees:emplId}
         },{new:true,useFindAndModify:false});
         updateDep && res.status(200).json({message:"Success",updateDep})
    }catch(error){
        next(error)
    }
})
//delete employee from department
router.put('/delete/:id',async(req,res,next)=>{

    try{
                
               
                const department = await Departments.findById(req.params.id);
                console.log("department",department)
               
                const update = await Departments.findByIdAndUpdate(req.params.id,{
                    $pull:{employees:{$in:req.body.id}}
                })
                console.log("updated",update)
              update && res.status(200).json({messgae:"Updated List of employees",update})
    }catch(error){
        next(error)
    }

})
//delete department
router.delete('/:id',async(req,res,next)=>{
    try{
         console.log("hello")
         await Departments.findById(req.params.id)
         console.log("params",req.params.id)
         const deletee  = await Departments.findByIdAndDelete(req.params.id)
         deletee && res.status(200).json({messgae:"Deleted",deletee})
    }catch(error){
      next(error)
    }
})

//Add Employee to a department 
router.put('/:id/addemployee',async(req,res,next)=>{
    try{
             

             
             const department = await Departments.findByIdAndUpdate(req.params.id,{
                $push:{employees:req.body.id}
             },{new:true,useFindAndModify:false})
             department && res.status(200).json({message:"Sucessfully Added Employee",department})
            console.log(department)
            
             
    }catch(error){
            next(error)
    }
})

/// department Info 
router.get('/get/info',async(req,res,next)=>{
    try{
               
        const depwiseemployees= await Departments.aggregate([
            {
              '$project': {
                'employees': {
                  '$size': '$employees'
                }, 
                'departmentname': 1
              }
            }
          ]) 
          console.log(depwiseemployees)
          depwiseemployees && res.status(200).json({message:"Success",depwiseemployees})
    }catch(error){
       console.log(error)
       next(error)
    }
})
module.exports = router