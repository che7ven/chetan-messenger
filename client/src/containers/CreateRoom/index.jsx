import React, { memo } from "react";
import PropTypes from "prop-types";
import { Grid, withStyles } from "@material-ui/core";
import Input from "../../components/Input";
import { Button } from "../../stories/Button";
import styles from "./styles";

const CreateRoom = ({
  classes,
  error,
  handleCreateRoom,
  roomName,
  handleRoom,
}) => {
  return (
    <>
      <Grid item>
        {error && roomName === "" && (
          <p className={classes.helperText} role="alert">
            Please enter a room name.
          </p>
        )}
      </Grid>
      <Grid item container className={classes.createRoomWrapper}>
        <Input
          value={roomName}
          label="Chatroom"
          type="outlined"
          handleChange={handleRoom}
          error={error && roomName === ""}
          style={{ width: "50%" }}
        />
        <Button
          handleClick={handleCreateRoom}
          label="Create Room"
          primary
          style={{ width: "20%" }}
        />
      </Grid>
    </>
    // </Grid>
  );
};

CreateRoom.defaultProps = {
  classes: {},
  error: false,
};

CreateRoom.propTypes = {
  classes: PropTypes.object,
  error: PropTypes.bool,
  handleCreateRoom: PropTypes.func.isRequired,
  roomName: PropTypes.string.isRequired,
  handleRoom: PropTypes.func.isRequired,
};

export default withStyles(styles)(memo(CreateRoom));
