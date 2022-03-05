import { io } from '../index.js';
import ChatMessage from '../models/ChatMessage.js';
const users = [];

export const handshake =  (socket, next)=>{
  if(socket.handshake && socket.handshake.query && socket.handshake.query.token){
    const token = socket.handshake.query.token;
    const userId = socket.handshake.query.loggedInUser;
    users[userId] = socket.id;

  }
  next();
}

export const userConnection = socket=>{
  //listening for incoming messages
  socket.on('send_message', async data=>{
      //sending message to the receiver
      io.to(users[data.receiver]).emit('new_message', data);
    const sentMessage = await  ChatMessage.create({
        sender: data.sender,
        receiver: data.receiver,
        message: data.message,
      });
    sentMessage.save()
  })
 
}