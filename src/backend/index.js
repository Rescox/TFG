require('./db')
const express = require('express')
const bodyParser = require('body-parser')

var userRoutes = require('./controllers/userController')
var cors = require('cors');
var app = express()
app.use(cors())
app.use(bodyParser.json())
app.listen(4000,()=> console.log("HOLA BUENAS"))

app.use('/user', userRoutes)