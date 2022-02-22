const mongoose = require('mongoose')


const User = new mongoose.Schema({
    id:{
        type:String,
        unique:true,
        required:true
    },
    name:String,
})


module.exports = mongoose.model('User',User);

