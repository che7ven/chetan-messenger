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
      users: [{ id: socket.id, userName }],
    });

    if (error) {
      callback(error);
    } else {
      socket.join(roomName);
      chatRoom.addUserToRoomByName(socket.id, userName, roomName);
      userDetails.updateRoomDetailsForUser(userName, roomName, true);
      callback();
    }

    io.emit("myRooms", chatRoom.getCreatedRoomsByName(userName));
    io.emit("otherRooms", chatRoom.getOtherRoomsByName(userName));
  });

  socket.on("joinRoom", ({ userName, roomName }, callback) => {
    socket.join(roomName);

    chatRoom.addUserToRoomByName(socket.id, userName, roomName);
    userDetails.updateRoomDetailsForUser(userName, roomName, false);

    callback();
  });

  socket.on("getRoomUsers", (roomName) => {
    io.in(roomName).emit("roomUsers", chatRoom.getUsersByRoom(roomName));
  });

  socket.on("getMessages", (roomName) => {
    io.in(roomName).emit(
      "allMessages",
      messagesInfo.getMessagesByRoom(roomName)
    );
  });

  socket.on("sendMessage", ({ message, roomName, userName }) => {
    const user = userDetails.getUserByName(userName);

    messagesInfo.setMessage(message, roomName, userName, user?.userId);
    io.in(roomName).emit(
      "receiveMessage",
      messagesInfo.getCurrentMessage(message, roomName, userName, user?.userId)
    );
  });

  socket.on("disconnect", () => {
    console.log("User disconnected: " + socket.id);
    const roomName = chatRoom.getRoomByUserId(socket.id);

    if (roomName) {
      const user = userDetails.removeRoomByIdAndRoomName(
        socket.id,
        roomName
      )[0];
      const rooms = chatRoom.removeUserByIdAndRoomName(socket.id, roomName)[0];

      if (user) {
        io.in(roomName).emit("notification", {
          description: `${user.userName} left the room`,
        });

        console.log(`${user.userName} left the room`);
        io.in(roomName).emit("users", rooms);
      }
    }
  });
});

server.listen(3001, () => {
  console.log("CHAT SERVER STARTED on port 3001.....");
});
