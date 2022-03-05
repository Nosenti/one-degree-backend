import Notification from "../models/Notificaiton.js";


export default {
  getNotifications: async (req, res) => {
    try {
      const { id } = req.user;
      const savedNotifications = await Notification.find({ userId: id });
      if (!savedNotifications || savedNotifications.length === 0) {
        return res.status(404).json({ message: 'No notifications yet'});
      }
      return res.status(200).json({ message: 'All received notifications', savedNotifications });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error!'});
    }
  },
  markAsRead: async (req, res) => {
    try {
      const { id } = req.user;
      const allNotifications = await Notification.find({$and: [{ userId: id}, {status: 'unread'}]})
      if (!allNotifications || allNotifications.length === 0) return res.status(404).json({ message: 'No unread notifications' });
      
      await Notification.updateOne({ userId: id, status: 'unread'},{ status: 'read'});

      return res.status(200).json({ message: 'All notifications marked as read'})
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
};