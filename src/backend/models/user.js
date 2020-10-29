const mongoose = require('mongoose')

var user = mongoose.model('user', 
{
    name: {type: String},
    email: {type: String},
    password: {type: String},
    status: {type: String}
})

module.exports = { user }