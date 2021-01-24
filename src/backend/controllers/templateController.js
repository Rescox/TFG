const express = require('express')
var router = express.Router()
var ObjectID = require('mongoose').Types.ObjectId

var { template } = require('../models/template')

router.get('/',(req,res)=> {
    template.find((err,docs)=> {
        if('!err') res.send(docs)
        else console.log('ERROR en get')
    })
})

router.get('/:email',(req,res)=> {
    template.find({'creator': req.params.email},(err,docs)=> {
        console.log(req.params.email)
        if(err) res.send(err);
        else res.send(docs)
    })
})

router.post('/', (req,res)=> {
    var newTemplate = new template({
        name: req.body.name,
        html: req.body.html,
        creator: req.body.creator,
        status_usable: false,
        gophish_id: 0
    })
    
    newTemplate.save((err,docs)=> {
        if(!err) res.send(docs)
        else console.log(err)
    })
})

router.put('/:id', (req,res)=> {
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send('No template found with that id')
    var updatedTemplate = {
        name: req.body.name,
        html: req.body.html,
        creator: req.body.creator,
        gophish_id: req.body.gophish_id,
        status_usable: req.body.status_usable
    }
    template.findByIdAndUpdate(req.params.id,{$set:updatedTemplate}, (err, docs) => {
        if(!err) res.send(docs)
        else console.log("ERROR en put")
    })
})

router.delete('/:id', (req,res)=> {
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send('No template found with that id')
    
    template.findByIdAndRemove(req.params.id, (err, docs) => {
        if(!err) res.send(docs)
        else console.log("ERROR en put")
    })
})

module.exports = router