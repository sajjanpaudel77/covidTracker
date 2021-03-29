const User = require('../models/User')
// const { populate } = require('../models/Order');
// const Order = require('../models/Order')
const router = require('express').Router();

router.use((req,res,next)=>{
  let trueAdmin = true
  req.trueAdmin = trueAdmin//check here if admins token is not expire
  if(trueAdmin){
    next()
  }else{
    res.sendStatus(403)
  }
})

router.route('/')


router.route('/dashboard')
  .get((req,res)=>{
    User.find({})
    .populate("customer")
    .exec()
    .then((data)=>{
      res.json(data)
    })
  })
  .post((req,res)=>{
    console.log(req.body)
    Order.create(req.body)
    .then(data=>res.status(200).json(data))
    .catch(err=>res.status(500).json(err))
  })

module.exports = router