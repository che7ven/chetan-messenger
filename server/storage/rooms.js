class Rooms {
  constructor() {
    this.rooms = [];
  }

  createRoom(roomDetails) {
    const existingRoom = this.rooms.find(
      (r) =>
        r.roomName.trim().toLowerCase() ===
        roomDetails.roomName.trim().toLowerCase()
    );

    if (existingRoom) {
      return {
        error: "Room has already been taken, please use Join Room option.",
      };
    }

    this.rooms.push(roomDetails);
    console.log("INSIDE createRoom!");
    console.log(this.rooms);

    return roomDetails;
  }

  getRooms() {
    return this.rooms;
  }

  addUserToRoomByName(userName, roomName) {
    this.rooms = this.rooms.map((room) => {
      if (room.roomName === roomName) {
        const users = { ...room }.users;
        if (!users?.includes(userName)) {
          return { ...room, users: [...room.users, userName] };
        }
        return room;
      }
      return room;
    });
    console.log("INSIDE addUserToRoomByName 2!");
    console.log(this.rooms);
  }

  getCreatedRoomsByUserId(userId) {
    return this.rooms.filter(({ creatorId }) => creatorId === userId);
  }

  getCreatedRoomsByName(name) {
    return this.rooms.filter(({ creatorName }) => creatorName === name);
  }

  getOtherRoomsByName(name) {
    return this.rooms.filter(({ creatorName }) => creatorName !== name);
  }

  getOtherRoomsByUserId(userId) {
    return this.rooms.filter(({ creatorId }) => creatorId !== userId);
  }

  getRoomsByUserId(userId) {
    return this.rooms.filter(({ users }) => users.includes(userId));
  }

  getRoomsNotPartOfUserId(userId) {
    return this.rooms.filter(({ users }) => !users.includes(userId));
  }

  getUsersByRoom(room) {
    return this.rooms.filter(({ roomName }) => roomName === room)[0];
  }
}

export default Rooms;
