import { emitEvent } from './emitEvent.js';

const notify = (connectStatus, type, id, titleMessage, notiMessage) => {
  if (connectStatus === type) {
    const notification = {
      eventType: type,
      requestId: id,
      title: titleMessage,
      message: notiMessage,
      link: `/${id}`,
      status: 'unread'
    };
    emitEvent.emit('notification', notification);
  }
};

export default notify;