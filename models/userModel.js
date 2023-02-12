const mongoose = require('mongoose')

const userSchema  = mongoose.Schema({
    name : String,
    isAdmin : Boolean,
    email : {type: String , required : true , lowercase: true} ,
    password : {type: String , required : true  }
})


const userModel = mongoose.model('user', userSchema)
module.exports = userModel;
