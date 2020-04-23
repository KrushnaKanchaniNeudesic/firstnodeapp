const mongoose = require('mongoose');
const validator = require('validator');
  
const user = mongoose.model('user',{
    name:{
        type: String
    }
})

module.exports = user;