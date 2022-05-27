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

  addUserToRoomByName(id, userName, roomName) {
    this.rooms = this.rooms.map((room) => {
      if (room.roomName === roomName) {
        const users = { ...room }.users;
        if (users?.findIndex((user) => user.userName === userName) === -1) {
          return { ...room, users: [...room.users, { id, userName }] };
        }
        return room;
      }
      return room;
    });
    console.log("INSIDE addUserToRoomByName!");
    console.log(this.rooms);
  }

  getRoomByUserId(userId) {
    return this.rooms
      ?.map((room) => {
        return {
          roomName: room.roomName,
          index: room.users?.findIndex((user) => user.id === userId),
        };
      })
      ?.filter((a) => a.index !== -1)[0]?.roomName;
  }

  removeUserByIdAndRoomName(id, roomName) {
    if (id && roomName) {
      return this.rooms
        .map((room) => {
          if (room.roomName === roomName) {
            const index = room.users.findIndex((user) => user.id === id);
            room.users.pop(room.users[index]);
            return room;
          }
        })
        .filter(Boolean);
    }
    this.rooms;
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

  getRoomsNotPartOfUserId(userId) {
    return this.rooms.filter(({ users }) => !users.includes(userId));
  }

  getUsersByRoom(room) {
    return this.rooms.filter(({ roomName }) => roomName === room)[0];
  }
}

export default Rooms;
