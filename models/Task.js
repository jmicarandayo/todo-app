const mongoose = require('mongoose')
const Schema = mongoose.Schema


const taskSchema = new Schema({
    title: {
        unique: true,
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

const Task = mongoose.model('Task', taskSchema)
module.exports = Task;