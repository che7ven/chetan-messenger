import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import Messages from "./storage/messages.js";
import Rooms from "./storage/rooms.js";
import Users from "./storage/users.js";
import { SOCKET_CLIENT_URL } from "./utils/constants.js";

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: SOCKET_CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

const messagesInfo = new Messages();
const chatRoom = new Rooms();
const userDetails = new Users();

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("login", ({ userName }, callback) => {
    userDetails.addLoggedInUser(userName, socket.id);

    callback();
  });

  socket.on("getRooms", ({ userName }) => {
    io.emit("myRooms", chatRoom.getCreatedRoomsByName(userName));
    io.emit("otherRooms", chatRoom.getOtherRoomsByName(userName));
  });

  socket.on("createRoom", ({ roomName, userName }, callback) => {
    const { error } = chatRoom.createRoom({
      creatorName: userName,
      roomName,
      users: [userName],
    });

    if (error) {
      callback(error);
    } else {
      socket.join(roomName);
      chatRoom.addUserToRoomByName(userName, roomName);
      userDetails.updateRoomDetailsForUser(userName, roomName, true);
      callback();
    }

    io.emit("getRooms", { userName });
  });

  socket.on("getRoomUsers", (roomName) => {
    io.in(roomName).emit("roomUsers", chatRoom.getUsersByRoom(roomName));
  });

  socket.on("joinRoom", ({ userName, roomName }, callback) => {
    socket.join(roomName);

    chatRoom.addUserToRoomByName(userName, roomName);

    userDetails.updateRoomDetailsForUser(userName, roomName, false);

    callback();
  });

  socket.on("getMessages", (roomName) => {
    io.in(roomName).emit(
      "allMessages",
      messagesInfo.getMessagesByRoom(roomName)
    );
  });

  socket.on("sendMessage", ({ message, roomName, userName }) => {
    const user = userDetails.getUserByName(userName);
    console.log("INSIDE sendMessage!");
    console.log(user);

    messagesInfo.setMessage(message, roomName, userName, user?.userId);

    console.log(
      messagesInfo.getCurrentMessage(message, roomName, userName, user?.userId)
    );
    io.in(roomName).emit(
      "receiveMessage",
      messagesInfo.getCurrentMessage(message, roomName, userName, user?.userId)
    );
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
    const room = chatRoom.getRoomsByUserId(socket.id);
    const user = userDetails.deleteUserById(socket.id);

    if (user) {
      io.in(room.roomName).emit("notification", {
        title: "Someone just left",
        description: `${user.userName} just left the room`,
      });

      console.log(`${user.userName} just left the room`);
      console.log(chatRoom.getUsersByRoom(room.roomName));
      io.in(room.roomName).emit(
        "users",
        chatRoom.getUsersByRoom(room.roomName)
      );
    }
  });
});

server.listen(3001, () => {
  console.log("CHAT SERVER STARTED on port 3001.....");
});
