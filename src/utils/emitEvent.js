import { EventEmitter } from 'events';
import notificationHelper from './notification.js';

export const emitEvent = new EventEmitter();

export default () => {
  emitEvent.on('notification', notificationHelper.sendNotification);
};