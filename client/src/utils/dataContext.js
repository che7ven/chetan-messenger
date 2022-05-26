import React, { useState } from "react";

const DataContext = React.createContext();

const DataProvider = ({ children }) => {
  const [userName, setUserName] = useState("");
  const [roomName, setRoomName] = useState("");

  return (
    <DataContext.Provider
      value={{ userName, roomName, setUserName, setRoomName }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
