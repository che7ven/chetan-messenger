import React from "react";
import PropTypes from "prop-types";
import {
  List,
  ListItem,
  ListItemText,
  Grid,
  withStyles,
  Typography,
} from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import styles from "./styles";

const ItemList = ({ classes, roomList, handleJoinRoom }) => (
  <>
    {roomList && roomList?.length !== 0 && (
      <Grid className={classes.root}>
        <List component="nav" aria-label="chatrooms" style={{ padding: 0 }}>
          {roomList?.map((room) => (
            <ListItem button onClick={() => handleJoinRoom(room.roomName)}>
              <ListItemText primary={room.roomName} />
              <ArrowForwardIcon />
            </ListItem>
          ))}
        </List>
      </Grid>
    )}
    {roomList && roomList?.length === 0 && (
      <Typography className={classes.noChatroom}>
        No chat rooms available.
      </Typography>
    )}
  </>
);

ItemList.defaultProps = {
  classes: {},
  roomList: [],
  handleJoinRoom: () => {},
};

ItemList.propTypes = {
  classes: PropTypes.object,
  roomList: PropTypes.arrayOf(PropTypes.object),
  handleJoinRoom: PropTypes.func,
};

export default withStyles(styles)(ItemList);
