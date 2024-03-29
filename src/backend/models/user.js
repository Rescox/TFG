const mongoose = require('mongoose')

var user = mongoose.model('user', 
{
    name: {type: String},
    email: {type: String},
    password: {type: String},
    role: {
        type: String, 
        enum: ['Admin', 'User'],
        default: 'User'
    },
    status: {
        type: String, 
        enum: ['Pending', 'Active'],
        default: 'Pending'
    },
    confirmationCode: { 
        type: String, 
        unique: true
    },
})

module.exports = { user }