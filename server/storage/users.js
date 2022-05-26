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
    console.log("INSIDE updateRoomDetailsForUser 2!");
    console.log(this.users);
  }

  deleteUserById(id) {
    const index = this.users.findIndex(({ userId }) => userId === id);
    if (index !== -1) return this.users.splice(index, 1)[0];

    console.log("INSIDE deleteUserById!");
    console.log(this.users);
  }
}

export default Users;
