const timespan = require('jsonwebtoken/lib/timespan');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        unique: true,
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps:true})

const User = mongoose.model('User', userSchema);
module.exports = User;