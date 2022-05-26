import { getTimestamp } from "../utils/common.js";

class Messages {
  constructor() {
    this.messages = [];
  }

  setMessage(message, roomName, sender, senderId) {
    //can include seen by, media
    this.messages.push({
      message,
      roomName,
      sender,
      senderId,
      timestamp: getTimestamp(),
    });
  }

  getMessagesByRoom(room) {
    return this.messages.filter(({ roomName }) => roomName === room);
  }

  getCurrentMessage(message, roomName, sender, senderId) {
    return {
      message,
      roomName,
      sender,
      senderId,
      timestamp: getTimestamp(),
    };
  }
}

export default Messages;
