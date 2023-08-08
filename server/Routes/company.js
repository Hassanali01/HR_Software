const express = require('express')
const router = express.Router();
const Company = require("../Models/Company/Company")
const createError = require('../Utils/CreateError')
const { default: mongoose } = require('mongoose')

router.post("/company",async(req,res,next)=>{

    const {title,status,NTN_number,description,address}= req.body

    try{
        const company = await Company.create({title,status,NTN_number,description,address})
        res.status(200).json(company)  

    }catch(error){
        res.status(400).json({error:error.message})

    }

})

router.get('/allCompany' , async(req,res)=>{
    console.log("comapny api hittt")
    try{
        const company = await Company.find()
        res.status(200).json(company)
        console.log("yes")

    }catch(error){
        res.status(400).json({error:error.message})
        console.log("no...")
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