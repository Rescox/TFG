const mongoose = require('mongoose')

var campaign = mongoose.model('campaign', 
{
    name: {type: String},
    group: {type: Array},
    launchDate: {type: Date},
    endDate: {type: Date},
    state: {type: String},
    creator: {type: String},
    template: {type: Array},
    gophish_id: {type: Array}
})

module.exports = { campaign }