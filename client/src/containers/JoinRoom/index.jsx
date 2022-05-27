import React, { memo, useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PropTypes } from "prop-types";
import { Grid, Typography, withStyles } from "@material-ui/core";
import CreateRoom from "../CreateRoom";
import ItemList from "../../components/ItemList";
import Header from "../../components/Header";
import { DataContext } from "../../utils/dataContext";
import SocketContext from "../../utils/socketContext";
import styles from "./styles";

const JoinRoom = ({ classes }) => {
  const [myRooms, setMyRooms] = useState([]);
  const [otherRooms, setOtherRooms] = useState([]);
  const navigate = useNavigate();
  const socket = useContext(SocketContext);
  const { userName, setUserName, roomName, setRoomName } =
    useContext(DataContext);

  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (userName !== "") {
      setUserName(userName);
      socket.emit("getRooms", { userName });

      const setMyOtherRooms = (rooms) => {
        rooms.forEach((room) => {
          if (room.creatorName === userName) {
            setMyRooms(rooms);
          } else {
            setOtherRooms(rooms);
          }
        });
      };

      socket.on("myRooms", (my) => {
        setMyOtherRooms(my);
      });

      socket.on("otherRooms", (other) => {
        setMyOtherRooms(other);
      });
    } else {
      navigate("/");
    }
  }, [socket, userName, navigate]);

  const handleRoom = (event) => {
    setErrorMsg("");
    setRoomName(event.target.value);
  };

  const handleCreateRoom = () => {
    if (userName !== "" && roomName !== "") {
      socket.emit("createRoom", { userName, roomName }, (error) => {
        if (error) {
          setErrorMsg(error);
        } else {
          navigate("/chat");
        }
      });
    } else {
      setError(true);
    }
  };

  const handleJoinRoom = (roomName) => {
    if (userName !== "" && roomName !== "") {
      setRoomName(roomName);
      socket.emit("joinRoom", { userName, roomName }, (error) => {
        if (error) {
          setErrorMsg(error);
        } else {
          navigate("/chat");
        }
      });
    } else {
      setError(true);
    }
  };

  return (
    <Grid container className={classes.chatContainer}>
      <Header />
      <Typography style={{ fontSize: "large", fontFamily: "monospace" }}>
        Hi {`{${userName}}`}, Welcome to my chat-bot!
      </Typography>
      <CreateRoom
        error={error}
        errorMsg={errorMsg}
        handleRoom={handleRoom}
        handleCreateRoom={handleCreateRoom}
      />
      <Grid item style={{ width: "25%" }}>
        {myRooms?.length === 0 && otherRooms?.length === 0 && (
          <p className={classes.helperText} role="alert">
            No rooms available.
          </p>
        )}
        {errorMsg !== "" && (
          <p className={classes.helperText} role="alert">
            {errorMsg}
          </p>
        )}
      </Grid>
      {(myRooms?.length !== 0 || otherRooms?.length !== 0) && (
        <Grid item container className={classes.listWrapper}>
          <Grid item className={classes.listWrapper}>
            <Typography className={classes.roomHead}>
              Chat rooms by me
            </Typography>
            <ItemList roomList={myRooms} handleJoinRoom={handleJoinRoom} />
          </Grid>
          <Grid item className={classes.listWrapper}>
            <Typography className={classes.roomHead}>
              Chat rooms by others
            </Typography>
            <ItemList roomList={otherRooms} handleJoinRoom={handleJoinRoom} />
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

JoinRoom.defaultProps = {
  classes: {},
};

JoinRoom.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(memo(JoinRoom));
