const mongoose = require('mongoose')
const Schema = mongoose.Schema
const MessageSchema = new Schema({
    conversation_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation'
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    type: {
        type: String,
        enum: ['file', 'text'],
        default: 'text'
    },
    content: {
        type: String
    },
    unread: {
        type: Boolean,  // Corrected type to Boolean
        default: true   // You might want to set a default value
    }
},
    {
        timestamps: true
    });

module.exports = mongoose.model('Message', MessageSchema)