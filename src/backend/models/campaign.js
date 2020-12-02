const mongoose = require('mongoose')

var campaign = mongoose.model('campaign', 
{
    name: {type: String},
    group: {type: Array},
    launchDate: {type: Date},
    endDate: {type: Date},
    state: {type: String},
    creator: {type: String}
})

module.exports = { campaign }