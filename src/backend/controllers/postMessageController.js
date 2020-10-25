const express = require('express')
var router = express.Router()
var ObjectID = require('mongoose').Types.ObjectId

var { PostMessage } = require('../models/postMessage')

router.get('/',(req,res)=> {
    PostMessage.find((err,docs)=> {
        if('!err') res.send(docs)
        else console.log('ERROR en get')
    })
})
router.post('/', (req,res)=> {
    console.log(req.body.name)
    var newUser = new PostMessage({
        name: req.body.name,
        email: req.body.email,
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
        email: req.body.email
    }
    PostMessage.findByIdAndUpdate(req.params.id,{$set:updatedUser}, (err, docs) => {
        if(!err) res.send(docs)
        else console.log("ERROR en put")
    })
})


router.delete('/:id', (req,res)=> {
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send('No user found with that id')
    
    PostMessage.findByIdAndRemove(req.params.id, (err, docs) => {
        if(!err) res.send(docs)
        else console.log("ERROR en put")
    })
})
module.exports = router