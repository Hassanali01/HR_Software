const express = require('express');
const router = express.Router();
const Setup = require('../../Models/payroll/setup')


router.post('/',async(req,res,next)=>{
    try{
          const setup = new Setup({
            title:req.body.title,
            npd_formula:req.body.npd_formula, 
            applyGazettedHoliday: req.body.applyGazettedHoliday,
            daysoff: req.body.daysoff 
          })
          
          const payrollsetup = await setup.save();
          save && res.status(200).json({message:"success", payrollsetup})
    }
    catch(error){

        console.log("error in payroll setup", error)

        next(error)
    }
});


router.get('/',async(req,res,next)=>{
    try{
         const setup = await Setup.find();
         setup && res.status(200).json(setup)
    }catch(error){
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const setupId = req.params.id;
        const deletedSetup = await Setup.findByIdAndDelete(setupId);
        if (!deletedSetup) {
            return res.status(404).json({ message: 'Setup not found' });
        }
        res.status(200).json({ message: 'Setup deleted successfully', deletedSetup });
    } catch (error) {
        console.log('Error deleting setup', error);
        next(error);
    }
});

module.exports = router