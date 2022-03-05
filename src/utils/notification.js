
import { io } from '../index.js';
import Notification from '../models/Notificaiton.js';

export default {
  sendNotification: async ({
    userId, title, message, status, eventType, link
  }) => {
    try {
      const notification = {
        userId, title, message, status, link
      };
      const createdNotif = await Notification.create(notification);
      const savedNotif = await createdNotif.save()

      notification.id = savedNotif.id;
      notification.time = Date.now();

      if (eventType === 'SUGGESTION') {
        io.sockets.in(`notification_${userId}`).emit('suggestion', notification);
      }
      if (eventType === 'APPROVED') {
        io.sockets.in(`notification_${userId}`).emit('approved', notification);
      }
      if (eventType === 'REJECTED') {
        io.sockets.in(`notification_${userId}`).emit('rejected', notification);
      }
      return savedNotif;
    } catch (error) {
      throw new Error(error);
    }
  }
};