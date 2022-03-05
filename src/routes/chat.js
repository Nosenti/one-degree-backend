import express from 'express';
import { 
    deleteChatMessage, 
    getChatList, 
    getChatsBetweenTwoUsers, 
    getLastMessageBetweenTwo, 
    getUnreadMessages, 
    markAsRead, 
    postChat 
} from '../controllers/chat.js';
import checkAuth from '../middleware/checkAuth.js';


const router = express.Router();

// get messages between two registered users
router.get('/', checkAuth.verifyUser, getChatsBetweenTwoUsers);

// get number of unreads between two users
router.get('/unread', checkAuth.verifyUser, getUnreadMessages);

// get last message between two users
router.get('/last', checkAuth.verifyUser, getLastMessageBetweenTwo);

// get chatlist for one user
router.get('/chatlist', checkAuth.verifyUser, getChatList);

// post / send your message to other registered user
router.post('/', checkAuth.verifyUser, postChat);

// mark the message as read ( status to `true` ) by receiver
router.put('/read', checkAuth.verifyUser, markAsRead);

// delete a chat if you are the sender
router.delete('/', checkAuth.verifyUser, deleteChatMessage);




export default router;