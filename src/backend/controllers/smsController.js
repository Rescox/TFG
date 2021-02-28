const express = require('express')
var router = express.Router()
var ObjectID = require('mongoose').Types.ObjectId

var { sms } = require('../models/sms')

router.get('/',(req,res)=> {
    sms.find((err,docs)=> {
        if('!err') res.send(docs)
        else console.log('ERROR en get')
    })
})

router.get('/details/:id',(req,res)=> {
    sms.find({'_id': req.params.id},(err,docs)=> {
        if(err) res.send(err);
        else { 
            res.send(docs);
        }
    })
})

router.get('/:email',(req,res)=> {
    sms.find({'creator': req.params.email},(err,docs)=> {
        console.log(req.params.email)
        if(err) res.send(err);
        else res.send(docs)
    })
})

router.post('/', (req,res)=> {
    var newSms = new sms({
        name: req.body.name,
        group: req.body.group,
        state: req.body.state,
        creator: req.body.creator,
        launchDate: req.body.launchDate,
        body: req.body.body
    })
    
    newSms.save((err,docs)=> {
        if(!err) res.send(docs)
        else console.log(err)
    })
})

router.put('/details/:id', (req,res)=> {
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send('No sms found with that id')
        console.log(req.body[0].name);
    var updatedSms = {
        name: req.body[0].name,
        group: req.body[0].group,
        state: req.body[0].state,
        creator: req.body[0].creator,
        body: req.body[0].body,
        launchDate: req.body[0].launchDate,
    }
    console.log(updatedSms)
    sms.findByIdAndUpdate(req.params.id,{$set:updatedSms}, (err, docs) => {
        if(!err) res.send(docs)
        else console.log("ERROR en put")
    })
})

router.put('/:id', (req,res)=> {
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send('No sms found with that id')
    var updatedSms = {
        name: req.body.name,
        group: req.body.group,
        state: req.body.state,
        creator: req.body.creator,
        body: req.body.body,
        launchDate: req.body.launchDate,
    }
    console.log(updatedSms)
    sms.findByIdAndUpdate(req.params.id,{$set:updatedSms}, (err, docs) => {
        if(!err) res.send(docs)
        else console.log("ERROR en put")
    })
})

router.delete('/:id', (req,res)=> {
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send('No sms found with that id')
    
    sms.findByIdAndRemove(req.params.id, (err, docs) => {
        if(!err) res.send(docs)
        else console.log("ERROR en put")
    })
})

module.exports = router