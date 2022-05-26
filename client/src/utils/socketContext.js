import React from "react";
import io from "socket.io-client";
import { SOCKET_SERVER_URL } from "./constants";

export const socket = io(SOCKET_SERVER_URL, {
  transports: ["websocket", "polling"],
});
const SocketContext = React.createContext(socket);

export default SocketContext;
