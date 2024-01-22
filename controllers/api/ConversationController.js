const mongoose = require("mongoose");
let Conversation = require("../../models/Conversation");
let Message = require("../../models/Message");
let Participant = require("../../models/Participant")
let User = require("../../models/User")

let user = async (req, res) => {
    let current_id = req.params.id
    console.log(current_id);
    Conversation.find({ users: current_id })
        .populate('users', '-password')
        .populate('last_message_id')
        .sort('-last_message_id.updatedAt') // Sort based on the updatedAt field of the last message
        .exec()
        .then((conversations) => {
            if (conversations.length === 0) {
                return res.status(404).json({
                    success: false,
                    msg: 'No conversations found in the database!',
                });
            }
            res.status(200).json({ success: true, conversations: conversations });
        })
        .catch((err) => {
            res.status(500).json({ success: false, msg: err.message });
        });

}
let message = async (req, res) => {
    let conversation_id = req.params.id
    try {
        let messages = await Message.find({ conversation_id: conversation_id })
            .populate('user_id', '-password')
            .sort({ "createdAt": 1 })
        return res.status(200).json({
            success: true,
            data: { messages }
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: error
        })
    }
}
let show = async (req, res) => {

}
let create = async (req, res) => {

}
let store = async (req, res) => {

}
let edit = async (req, res) => {

}
let update = async (req, res) => {

}
let destroy = async (req, res) => {

}
module.exports = { user, message, create, store, edit, update, destroy }