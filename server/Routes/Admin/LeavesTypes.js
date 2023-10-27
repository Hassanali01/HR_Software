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

router.get('/addleaves/balance/', async (req, res, next) => {
    try {
console.log("req", req.query)
        const leaveTypeBalance = await Leaves.aggregate(
          [
            {
              '$match': {
                '_id': new ObjectId(req.query.id)
              }
            }, {
              '$project': {
                'balance': {
                  '$arrayElemAt': [
                    {
                      '$filter': {
                        'input': '$allocations', 
                        'cond': {
                          '$and': [
                            {
                              '$eq': [
                                '$$filtered.company', new ObjectId(req.query.company)
                              ]
                            }, {
                              '$eq': [
                                '$$filtered.department', new ObjectId(req.query.department)
                              ]
                            }, {
                              '$eq': [
                                '$$filtered.designation', new ObjectId(req.query.designation)
                              ]
                            }
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
                'balance': {
                  '$cond': {
                    'if': '$fetch', 
                    'then': '$fetch', 
                    'else': {
                      '$arrayElemAt': [
                        {
                          '$filter': {
                            'input': '$allocations', 
                            'cond': {
                              '$and': [
                                {
                                  '$eq': [
                                    '$$filtered.company', new ObjectId(req.query.company)
                                  ]
                                }, {
                                  '$eq': [
                                    '$$filtered.department', new ObjectId(req.query.department)
                                  ]
                                }
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
            },
            {
              '$project': {
                'balance': {
                  '$cond': {
                    'if': '$fetch', 
                    'then': '$fetch', 
                    'else': {
                      '$arrayElemAt': [
                        {
                          '$filter': {
                            'input': '$allocations', 
                            'cond': {
                              // '$and': [
                              //   {
                                  '$eq': [
                                    '$$filtered.company', new ObjectId(req.query.company)
                                  ]
                                // }, {
                                //   '$eq': [
                                //     '$$filtered.department', new ObjectId(req.query.department)
                                //   ]
                                // }
                              // ]
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
          ]
          
          
          )

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