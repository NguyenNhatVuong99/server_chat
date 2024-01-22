let Conversation = require("../../models/Conversation")
let User = require("../../models/User")
let Message = require("../../models/Message")
const Pusher = require("pusher");

let index = async (req, res) => {
    Message.find()
        .populate('user_id', '-password')
        .sort('-createdAt')
        .exec((err, messages) => {
            if (err) {
                return res.status(500).json({ success: false, msg: err.message });
            } else if (messages.length === 0) {
                return res.status(404).json({
                    success: false,
                    msg: 'No posts find in the database!',
                });
            }
            res.status(200).json({ success: true, posts: messages });
        });

}

let show = async (req, res) => {

}
let create = async (req, res) => {

}
const store = async (req, res) => {
    try {
        // const pusher = new Pusher({
        //     appId: "1529122",
        //     key: "44e9d951732245c631b5",
        //     secret: "1b630a54a02fc3b5b403",
        //     cluster: "ap1",
        //     useTLS: true
        // });

        let { content, conversation_id, user_id } = req.body;
        // Save the new message
        let newMessage = new Message({
            content,
            conversation_id,
            user_id
        });

        await newMessage.save();

        let message_id = newMessage._id;
        let updatedAt = newMessage.updatedAt;

        // Update the conversation
        const updatedConversation = await Conversation.findByIdAndUpdate(
            conversation_id,
            {
                last_message_id: message_id,
                updatedAt: updatedAt
            },
            { new: true } // Return the modified document instead of the original
        );

        if (!updatedConversation) {
            return res.status(404).json({ success: false, message: 'Conversation not found' });
        }

        // If you need to emit events or trigger other actions, you can do it here

        res.status(200).json({ success: true, data: updatedConversation });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

let edit = async (req, res) => {

}
let update = async (req, res) => {

}
let destroy = async (req, res) => {

}
module.exports = { index, show, create, store, edit, update, destroy }