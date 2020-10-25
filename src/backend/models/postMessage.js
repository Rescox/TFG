const mongoose = require('mongoose')

var PostMessage = mongoose.model('PostMessage', 
{
    name: {type: String},
    email: {type: String},
})

module.exports = { PostMessage }