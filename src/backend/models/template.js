const mongoose = require('mongoose')

var template = mongoose.model('template', 
{
    name: {type: String},
    html: {type: String},
    creator: {type: String},
    gophish_id: {type: Number},
    status_usable: {type: Boolean}
})

module.exports = { template }