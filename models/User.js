const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true,
    },
    full_name: {
        type: String,
        require: true,
    },
    full_name_without_diacritics: {
        type: String,
        require: true,
    },
    avatar: {
        type: String,
        require: true,
    },
    cover: {
        type: String,
        require: true,
    },
    role:{
        type: String,
        enum : ['user','admin'],
        default: 'user'
    },
    friend_count: {
        type: Number,
    },
    is_active: {
        type: Boolean,
        require: true,
    }
},
    {
        timestamps: true
    })


const User = mongoose.model('User', UserSchema)
module.exports = User