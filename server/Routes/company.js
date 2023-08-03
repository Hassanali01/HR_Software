const express = require('express')
const router = express.Router();
const Company = require("../Models/Company/Company")
const createError = require('../Utils/CreateError')

router.post("/company",async(req,res,next)=>{
    try{ 
         const company = new Company({
            title:req.body.title,
            status:req.body.status
         }) 
          company && res.status(200).json({message:"Success",company})
    }catch(error){
           next(error)
    }
})
router.put('/company/:id',async(req,res,next)=>{
    try{
            const findcompany = await Company.findById(req.params.id)
              if(!findcompany){
                  next(createError(404,"Company not found"))
              }
           const company = await Company.findByIdAndUpdate(req.params.id,{
            $set:req.body
           });
          company && res.status(200).json({message:"Success",company})
           
    }catch(error){
        next(error)
    }
})

router.delete('/company/:id',async(req,res,next)=>{
    try{
          const findcompany = await  Company.findById(req.params.id)
          if(!findcompany){
            next(createError(404,"Company not Found"))
          }
          const DeletdCompany = await Company.findByIdAndDelete(req.params.id);
          DeletdCompany && res.status(200).json({message:"Success",DeletdCompany})
    }catch(error){
          next(error)
    }
})
module.exports = router