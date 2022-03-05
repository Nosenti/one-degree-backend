import ChatMessage from '../models/ChatMessage.js';
import User from '../models/User.js';


// getting chats between two users
export const getChatsBetweenTwoUsers = async (req, res, next) => {
  try {
    const user =  req.user;
    const loggedInUser = await User.findOne({_id: user.id})
    const userToChatWith = await User.findOne({_id: req.body.receiver });

    const chats = await ChatMessage.find({
        $and: [
            {$or: [
                { sender: loggedInUser._id, },
                { receiver: userToChatWith._id }
            ]},
            {$or: [
                { sender: userToChatWith._id },
                { receiver: loggedInUser._id }
            ]}
        ]});

    res.status(200).json({
      currentUser: loggedInUser._id,
      otherUser: userToChatWith._id,
      chats
    });
  } catch (err) {
    next(err);
  }
};

// getting chats between two users
export const getLastMessageBetweenTwo = async (req, res, next) => {
  try {
    const user =  req.user;
    const loggedInUser = await User.findOne({_id: user.id});
    const userToChatWith = await User.findOne({_id: req.body.receiver });

    if (userToChatWith) {
      const lastMessage = await ChatMessage.find({ 
          $and: [
              { $or: [{sender: userToChatWith._id}, {sender: loggedInUser._id}]},
              { $or: [{receiver: userToChatWith._id}, {receiver: loggedInUser._id}]}
            ]});

      res.status(200).json(lastMessage);
    } else {
        res.status(400).json({
            message: 'User does not exist'
        });
    }
  } catch (err) {
    next(err);
  }
};

// send chatMessage to someone registered
export const postChat = async (req, res, next) => {
  try {
    const user = req.user;
    const loggedInUser = await User.findOne({_id: user.id});
    const chatTo = await User.findOne({_id: req.body.receiver});
    if (chatTo) {
      const chatMessage = await ChatMessage.create({
        sender: loggedInUser._id,
        receiver: chatTo._id,
        message: req.body.message,
      });
      res.status(200).json({chatMessage});
    } else {
      res.status(400).json({
        message: 'User does not exist'
      });
    }
  } catch (err) {
    next(err);
  }
};

// delete a message if you are the sender
export const deleteChatMessage = async (req, res, next) => {
    const user = req.user;
  const currentUser = await User.findOne({_id: user.id});
  try {
    const chat = await ChatMessage.findOne({sender: currentUser._id});
    if (chat) {
      await ChatMessage.deleteMany();
      res.status(200).json({
        message: 'Message deleted'
      });
    } else {
      res.status(400).json({
        message: 'Message not available'
      });
    }
  } catch (err) {
    next(err);
  }
};

// Get all chatList for one user
export const getChatList = async (req, res, next) => {
  try {
    const user = req.user
    const loggedInUser = await User.findOne({_id: user.id});
    const chats = await ChatMessage.find({ $or: [
        {sender: loggedInUser._id},
        {receiver: loggedInUser._id}
    ]});

    const chatListIds = new Set();
    chats.forEach((chat) => {
      chatListIds.add(chat.sender);
      chatListIds.add(chat.receiver);
    });
    if (chatListIds.has(loggedInUser._id)) {
      chatListIds.delete(loggedInUser._id);
    }
    const chatList = await User.find({_id: Array.from(chatListIds)});

    res.status(200).json(chatList);
  } catch (err) {
    next(err);
  }
};

// mark chat message as read
export const markAsRead = async (req, res, next) => {
  try {
    const user = req.user

    const receiver = await User.findOne({ _id: user.id});
    const sender = await User.findOne({_id: req.body.sender});
    if (sender) {
      await ChatMessage.updateOne(
          {$and: [
              {receiver: receiver._id},
              {sender: sender._id}
          ]},
        { status: "read" }
      );
      res.status(200).json({
        message: 'marked as read',
        sender: sender._id,
        receiver: receiver._id
      });
    } else {
      res.status(404).send({
        message: 'user not found'
      });
    }
  } catch (error) {
    next(error);
  }
};


export const getUnreadMessages = async (req, res, next) => {
  try {
    const user = req.user
    const loggedInUser = await User.findOne({ _id: user.id});
    const userToChatWith = await User.findOne({_id: req.body.sender});

    if (userToChatWith instanceof User) {
        
      const unreadMessages = await ChatMessage.find({$and: [
          {sender: userToChatWith._id},
          {receiver: loggedInUser._id},
          {status: "unread"}
      ]});

      res.status(200).json({
        currentUser: loggedInUser._id,
        otherUser: userToChatWith._id,
        unreadMessages: unreadMessages.length
      });
    } else {
        res.status(404).send({
            message: 'user not found'
          });
    }
  } catch (err) {
    next(err);
  }
};
