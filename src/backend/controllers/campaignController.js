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

router.get('/:email',(req,res)=> {
    campaign.find({'creator': req.params.email},(err,docs)=> {
        console.log(req.params.email)
        if(err) res.send(err);
        else res.send(docs)
    })
})

router.post('/', (req,res)=> {
    var newCampaign = new campaign({
        name: req.body.name,
        group: req.body.group,
        launchDate: req.body.launchDate,
        endDate: req.body.endDate,
        state: req.body.state,
        creator: req.body.creator
    })
    
    newCampaign.save((err,docs)=> {
        if(!err) res.send(docs)
        else console.log(err)
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