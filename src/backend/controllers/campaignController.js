const express = require('express')
var router = express.Router()
var ObjectID = require('mongoose').Types.ObjectId

var { campaign } = require('../models/campaign')

router.get('/',(req,res)=> {
    campaign.find((err,docs)=> {
        if('!err') res.send(docs)
        else console.log('ERROR en get')
    })
})

router.get('/details/:id',(req,res)=> {
    campaign.find({'_id': req.params.id},(err,docs)=> {
        if(err) res.send(err);
        else {
            console.log(docs) 
            res.send(docs);
        }
    })
})

router.get('/:email',(req,res)=> {
    campaign.find({'creator': req.params.email},(err,docs)=> {
        console.log(req.params.email)
        if(err) res.send(err);
        else res.send(docs)
    })
})

router.post('/', (req,res)=> {
    console.log(req.body);
    var newCampaign = new campaign({
        name: req.body.name,
        group: req.body.group,
        launchDate: req.body.launchDate,
        endDate: req.body.endDate,
        state: req.body.state,
        creator: req.body.creator,
        template: req.body.template,
        gophish_id: []
    })
    
    newCampaign.save((err,docs)=> {
        if(!err) res.send(docs)
        else console.log(err)
    })
})

router.put('/:id', (req,res)=> {
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send('No campaign found with that id')
    var updatedCampaign = {
        name: req.body.name,
        group: req.body.group,
        launchDate: req.body.launchDate,
        endDate: req.body.endDate,
        state: req.body.state,
        creator: req.body.creator,
        template: req.body.template,
        gophish_id: req.body.gophish_id
    }
    console.log(req.body.gophish_id)
    console.log(req.body)
    campaign.findByIdAndUpdate(req.params.id,{$set:updatedCampaign}, (err, docs) => {
        if(!err) res.send(docs)
        else console.log("ERROR en put")
    })
})

router.delete('/:id', (req,res)=> {
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send('No campaign found with that id')
    
    campaign.findByIdAndRemove(req.params.id, (err, docs) => {
        if(!err) res.send(docs)
        else console.log("ERROR en put")
    })
})

module.exports = router