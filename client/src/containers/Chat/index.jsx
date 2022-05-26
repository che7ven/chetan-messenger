import React, { memo, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PropTypes } from "prop-types";
import {
  Button,
  Chip,
  Grid,
  Paper,
  Typography,
  withStyles,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Header from "../../components/Header";
import Input from "../../components/Input";
import { DataContext } from "../../utils/dataContext";
import SocketContext from "../../utils/socketContext";
import { isEmptyObject } from "../../utils/common";
import styles from "./styles";

const Chat = ({ classes }) => {
  const navigate = useNavigate();
  const socket = useContext(SocketContext);
  const { userName, setUserName, roomName, setRoomName } =
    useContext(DataContext);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [notify, setNotify] = useState({});

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setUserName(userName);
    setRoomName(roomName);

    if (!userName || !roomName) {
      navigate("/");
    }
  }, [userName, navigate, roomName]);

  useEffect(() => {
    socket.emit("getRoomUsers", roomName);
    socket.emit("getMessages", roomName);

    socket.on("roomUsers", (roomUsers) => {
      setUsers(roomUsers?.users);
    });

    socket.on("allMessages", (msgs) => {
      setMessages(msgs);
    });

    socket.on("receiveMessage", (msg) => {
      setMessages((messages) => [...messages, msg]);
    });

    socket.on("notification", (notif) => {
      setNotify(notif);
    });
  }, [socket, roomName]);

  const clearMessages = () => {
    setMessages([]);
  };

  const handleBackClick = () => {
    navigate("/join");
  };

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (userName !== "" && message !== "" && roomName !== "") {
      socket.emit("sendMessage", { message, userName, roomName });
      setMessage("");
    }
  };

  const logout = () => {
    setUserName("");
    setRoomName("");
    navigate("/");
    navigate(0);
  };

  return (
    <Grid container className={classes.chatContainer}>
      <Header />
      <Paper elevation={3} className={classes.chatPaperWrapper}>
        <Grid item container className={classes.paperHeader}>
          <ArrowBackIcon onClick={handleBackClick} style={{ marginLeft: 8 }} />
          <Typography variant="h5">{`Hi {${userName}}, Welcome to room: ${roomName}`}</Typography>
          <Button
            id="logout"
            variant="outlined"
            color="primary"
            onClick={logout}
            style={{ marginRight: 10 }}
          >
            Log Out
          </Button>
        </Grid>
        <Grid item container className={classes.messengerWrap}>
          <Grid item container className={classes.chatContent}>
            <Grid item className={classes.chatContentWrapper}>
              {messages?.map((content) => (
                <div
                  key={content.timestamp}
                  className={
                    content.sender === userName ? classes.me : classes.others
                  }
                >
                  <Chip
                    label={content.message}
                    color={
                      content.sender === userName ? "primary" : "secondary"
                    }
                    className={classes.chip}
                  />
                  <Typography
                    className={classes.name}
                    style={
                      content.sender === userName
                        ? { marginLeft: 12 }
                        : { marginLeft: 32 }
                    }
                  >{`${content.sender}  ${content.timestamp}`}</Typography>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </Grid>
            {!isEmptyObject(notify) && (
              <Grid item>{`${notify.title}, ${notify.description}`}</Grid>
            )}
            <Grid item className={classes.chatInputWrapper}>
              <Input
                value={message}
                label="Enter message"
                handleChange={handleChange}
                keyPressCall={handleSendMessage}
              />
              <div style={{ marginTop: 10 }}>
                <Button
                  id="send"
                  variant="contained"
                  color="primary"
                  onClick={handleSendMessage}
                  style={{ marginRight: 10 }}
                >
                  Send
                </Button>
                <Button
                  id="clear"
                  variant="outlined"
                  color="secondary"
                  onClick={clearMessages}
                >
                  Clear
                </Button>
              </div>
            </Grid>
          </Grid>
          <Grid item className={classes.usersWrapper}>
            <Typography variant="h6">Users Online</Typography>
            {users?.map((user) => (
              <p>{user}</p>
            ))}
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

Chat.defaultProps = {
  classes: {},
};

Chat.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(memo(Chat));
