const { mongo } = require('mongoose')
const mongoose = require('mongoose')

mongoose.connect('', {useNewUrlParser: true, useUnifiedTopology:true},
err => { 
    if(!err)
        console.log('Mongodb working')
    else
        console.log('no')

})
