const { mongo } = require('mongoose')
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://rescoTFG:rescoTFG1234@tfg.1etzg.mongodb.net/TFGEmails?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology:true},
err => { 
    if(!err)
        console.log('Mongodb ole')
    else
        console.log('no')

})