const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
    content: {
        type: String
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    file_url: {
        type: String
    },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    post_reacts: [{ type: Schema.Types.ObjectId, ref: 'PostReact' }]

},
    {
        timestamps: true
    })

module.exports = mongoose.model('Post', PostSchema)