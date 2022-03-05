import mongoose from "mongoose";


const messageSchema = mongoose.Schema({
    sender: {
        type: String,
        required: true
    },
    receiver: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default:'unread'
    },
    }, { timestamps: true}
);

const ChatMessage = mongoose.model('ChatMessage', messageSchema);


export default ChatMessage