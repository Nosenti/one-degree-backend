import mongoose from "mongoose";


const notificationSchema = mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    eventType: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default:'unread'
    },
    }, { timestamps: true}
);

const Notification = mongoose.model('Notification', notificationSchema);


export default Notification