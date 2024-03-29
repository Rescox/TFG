const mongoose = require('mongoose')

var sms = mongoose.model('sms', 
{
    name: {type: String},
    group: {type: Array},
    state: {type: String},
    launchDate: {type: Date},
    creator: {type: String},
    body: {type: Array}
})

module.exports = { sms }