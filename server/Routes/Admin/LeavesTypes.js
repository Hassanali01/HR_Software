const Leaves = require("../../Models/leavesTypes");
const express = require("express")
const router = express.Router();
var ObjectId = require('mongodb').ObjectId;


router.post('/addleaves', async (req, res, next) => {
    try {
        const leaves = new Leaves({
            leaveType: req.body.leaveType,
            description: req.body.description,
            allocations: req.body.allocations
        })
        const postLeave = await leaves.save();
        postLeave && res.status(200).json({
             message: "Leave added", postLeave
            })
    } catch (error) {
        next(error)
    }
})


router.put('/addleaves/:id', async (req, res, next) => {
    try {
        const leaves = await Leaves.findOneAndUpdate({_id:req.params.id},
            {
                description: req.body.description,
                allocations: req.body.allocations
            },
            {new:true}
            // function (err, docs) {
            //     if (err) {
            //         console.log(err)
            //     }
            //     else {
            //         console.log("Updated User : ", docs);
            //     }
            // }
            )
            res.status(200).send(leaves)
    } catch (error) {
        console.log("error", error)
    }
})





// Get the yearly leave type balance

router.get('/addleaves/balance/:id', async (req, res, next) => {
    try {
console.log("req", req.params.id)
        const leaveTypeBalance = await Leaves.aggregate(

        [
            {
              '$match': {
                '_id':new ObjectId(req.params.id)
              }
            }
            
            , {
              '$project': {
                'new': {
                  '$arrayElemAt': [
                    {
                      '$filter': {
                        'input': '$allocations', 
                        'cond': {
                          '$eq': [
                            '$$filtered.company', new ObjectId('64e2fdc6694a255532ce5a18')
                          ]
                        }, 
                        'as': 'filtered'
                      }
                    }, 0
                  ]
                }, 
                'allocations': 1
              }
            }, {
              '$project': {
                'new': {
                  '$cond': {
                    'if': '$fetch', 
                    'then': '$fetch', 
                    'else': {
                      '$arrayElemAt': [
                        {
                          '$filter': {
                            'input': '$allocations', 
                            'cond': {
                              '$eq': [
                                '$$filtered.company', new ObjectId('64e2fdc6694a255532ce5a18')
                              ]
                            }, 
                            'as': 'filtered'
                          }
                        }, 0
                      ]
                    }
                  }
                }, 
                'allocations': 1
              }
            }
          ])

          console.log(leaveTypeBalance)
         res.status(200).send(leaveTypeBalance)
    } catch (error) {
        console.log("error", error)
    }
})



router.get('', async (req, res, next) => {
    try {
        const getLeave = await Leaves.find();
        getLeave && res.status(200).json({ 
            message: "leaves", getLeave 
        })
    } catch (error) {
        next(error)
    }
})

module.exports = router