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

console.log("check", req.query.company ? new ObjectId(req.query.company) : null)

const leaveTypeBalance = await Leaves.aggregate(
          [
            {
              '$match': {
                '_id':  { $in: [ new ObjectId(req.query.id), new ObjectId('64d763f7fdc7352362fa49fe')]}
              }
            }
            
            , {
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
                                '$$filtered.company', req.query.company ? new ObjectId(req.query.company) : null
                              ]
                            }, {
                              '$eq': [
                                '$$filtered.department',req.query.department ? new ObjectId(req.query.department) : null
                              ]
                            }, {
                              '$eq': [
                                '$$filtered.designation',req.query.designation ? new ObjectId(req.query.designation) : null
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
            }, 
            
            {
              '$project': {
                'balance': {
                  '$cond': {
                    'if': '$balance', 
                    'then': '$balance', 
                    'else': {
                      '$arrayElemAt': [
                        {
                          '$filter': {
                            'input': '$allocations', 
                            'cond': {
                              '$and': [
                                {
                                  '$eq': [
                                    '$$filtered.company',req.query.company ? new ObjectId(req.query.company) : null
                                  ]
                                }, {
                                  '$eq': [
                                    '$$filtered.department',req.query.department ? new ObjectId(req.query.department) : null
                                  ]
                                },
                                {
                                  '$lt': [
                                    '$$filtered.designation',  null
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
                    'if': '$balance', 
                    'then': '$balance', 
                    'else': {
                      '$arrayElemAt': [
                        {
                          '$filter': {
                            'input': '$allocations', 
                            'cond': {
                              '$and': [
                                {
                                  '$eq': [
                                    '$$filtered.company',req.query.company ? new ObjectId(req.query.company) : null
                                  ]
                                },  {
                                  '$lt': [
                                    '$$filtered.department', null
                                  ]
                                },
                                {
                                  '$lt': [
                                    '$$filtered.designation', null
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
        const getLeave = await Leaves.find().populate('allocations.company').populate('allocations.department').populate('allocations.designation').exec();
        getLeave && res.status(200).json({ 
            message: "leaves", getLeave 
        })
    } catch (error) {
        next(error)
    }
})

module.exports = router