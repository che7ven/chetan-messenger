import React from "react";
import { Routes, Route } from "react-router-dom";
import { Chat, JoinRoom, Login } from "./containers";
import { DataProvider } from "./utils/dataContext";
import SocketContext, { socket } from "./utils/socketContext";
import { UsersProvider } from "./utils/usersContext";

const App = () => {
  return (
    <DataProvider>
      <UsersProvider>
        <SocketContext.Provider value={socket}>
          <title>Chevy's Messenger</title>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/join" element={<JoinRoom />} />
          </Routes>
        </SocketContext.Provider>
      </UsersProvider>
    </DataProvider>
  );
};

export default App;
