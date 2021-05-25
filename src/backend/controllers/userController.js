const express = require('express')
const bcrypt = require('bcryptjs')
const nodemailer = require('../services/nodemailerService')
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
    console.log(req.body.token)
    req.body.password = bcrypt.hashSync(req.body.password, 10)
    var newUser = new user({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: 'User',
        status: req.body.status,
        confirmationCode: req.body.token,
        campaign: []
    })
    
    newUser.save((err,docs)=> {
        if(!err) {  
            nodemailer.sendConfirmationEmail(newUser.name, newUser.email, newUser.confirmationCode);
            res.send(docs);
        }
        else console.log('Errorrr')
    })
})



router.post('/login', (req,res)=> {
    let body = req.body;

    user.findOne({ email: body.email }, (error, usuario) => {
        if(error) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: "Usuario noseque"
                }
            })
        }
        if(!usuario) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "usuarios y contraseñas incorrectas"
                }
            })
        }

        if(! bcrypt.compareSync(body.password, usuario.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "UsuarioContraseñaIncorrectos"
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuario,
        })
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

router.get('/verification/:confirmationCode', (req,res)=> {
    console.log(req.params.confirmationCode);
    
    user.findOne({
        confirmationCode: req.params.confirmationCode,
    }).then((user) => {
        console.log(user);
        if(user)  {
            user.status = "Active";
        } else {
            console.log("Error no se encontró ningún usuario");
        }

        user.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
            }
        });    
    });
    res.send("Exito");
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