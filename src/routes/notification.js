import { Router } from 'express';
import checkAuth from '../middleware/checkAuth.js';
import notification from '../controllers/notification.js';

const notificationRoutes = new Router();

notificationRoutes.get('/', checkAuth.verifyUser, notification.getNotifications);

notificationRoutes.put('/', checkAuth.verifyUser, notification.markAsRead);

export default notificationRoutes;