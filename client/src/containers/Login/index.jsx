import React, { memo, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PropTypes } from "prop-types";
import { Grid, withStyles } from "@material-ui/core";
import Header from "../../components/Header";
import Input from "../../components/Input";
import { Button } from "../../stories/Button";
import { DataContext } from "../../utils/dataContext";
import SocketContext from "../../utils/socketContext";
import styles from "./styles";

const Login = ({ classes }) => {
  const navigate = useNavigate();

  const socket = useContext(SocketContext);
  const { userName, setUserName } = useContext(DataContext);

  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleName = (event) => {
    setUserName(event.target.value);
  };

  const handleLogin = () => {
    if (userName === "") {
      setError(true);
    } else {
      socket.emit("login", { userName }, (error) => {
        if (error) {
          setErrorMsg(error);
        } else {
          navigate("/join");
        }
      });
    }
  };

  return (
    <Grid container className={classes.container}>
      <Header />
      <Grid item container className={classes.innerWrapper}>
        <Grid item>
          {error && userName === "" && (
            <p className={classes.helperText} role="alert">
              Please enter username.
            </p>
          )}
          {errorMsg !== "" && (
            <p className={classes.helperText} role="alert">
              {errorMsg}
            </p>
          )}
        </Grid>
        <Grid item className={classes.inputWrap}>
          <Input
            value={userName}
            label="User Name"
            type="outlined"
            handleChange={handleName}
            error={error && userName === ""}
          />
        </Grid>
        <Grid item className={classes.buttonWrap}>
          <Button
            handleClick={handleLogin}
            label="Login"
            primary
            style={{ pointer: "cursor" }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

Login.defaultProps = {
  classes: {},
};

Login.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(memo(Login));
