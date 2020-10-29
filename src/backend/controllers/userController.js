const express = require('express')
const bcrypt = require('bcryptjs')
var router = express.Router()
var ObjectID = require('mongoose').Types.ObjectId

var { user } = require('../models/user')

router.get('/',(req,res)=> {
    user.find((err,docs)=> {
        if('!err') res.send(docs)
        else console.log('ERROR en get')
    })
})
router.post('/', (req,res)=> {
    console.log(req.body.name)
    req.body.password = bcrypt.hashSync(req.body.password, 10)
    var newUser = new user({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        status: "created"
    })
    
    newUser.save((err,docs)=> {
        if(!err) res.send(docs)
        else console.log('Errorrr')
    })
})

router.put('/:id', (req,res)=> {
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send('No user found with that id')
    var updatedUser = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    }
    user.findByIdAndUpdate(req.params.id,{$set:updatedUser}, (err, docs) => {
        if(!err) res.send(docs)
        else console.log("ERROR en put")
    })
})


router.delete('/:id', (req,res)=> {
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send('No user found with that id')
    
    user.findByIdAndRemove(req.params.id, (err, docs) => {
        if(!err) res.send(docs)
        else console.log("ERROR en put")
    })
})
module.exports = router