import { getTimestamp } from "../utils/common.js";
class Users {
  constructor() {
    this.users = [];
  }

  addLoggedInUser(name, userId) {
    if (!this.users.find(({ userName }) => userName === name)) {
      const user = {
        userName: name,
        userId,
        rooms: [],
        loggedInTime: getTimestamp(),
      };

      this.users.push(user);
    }
    console.log("INSIDE addLoggedInUser!");
    console.log(this.users);
  }

  getUsers() {
    return this.users;
  }

  getUserById(id) {
    return this.users.filter(({ userId }) => userId === id)[0];
  }

  getUserByName(name) {
    return this.users.filter(({ userName }) => userName === name)[0];
  }

  updateRoomDetailsForUser(userName, roomName, isCreator) {
    this.users = this.users.map((user) => {
      if (user.userName === userName) {
        return {
          ...user,
          rooms: [
            ...user.rooms,
            {
              roomName,
              isCreator,
            },
          ],
        };
      }
      return user;
    });
    console.log("INSIDE updateRoomDetailsForUser!");
    console.log(this.users);
  }

  removeRoomByIdAndRoomName(id, roomName) {
    if (id && roomName) {
      return this.users
        .map((user) => {
          if (user.userId === id) {
            const index = user.rooms.findIndex(
              (room) => room.roomName === roomName
            );
            user.rooms.pop(user.rooms[index]);
            return user;
          }
        })
        .filter(Boolean);
    }
    return this.users;
  }
}

export default Users;
