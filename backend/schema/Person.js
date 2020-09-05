const mongoose = require('mongoose')

const Person = mongoose.Schema({
    _id : mongoose.Types.ObjectId,
    username: {
        type:String,
        required: true
    },
    password: {
        type:String,
        required : true
    },
    type: {
        type: String,
        required: true
    } 
})
module.exports = mongoose.model('Person',Person)