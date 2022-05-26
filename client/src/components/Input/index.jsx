import React from "react";
import PropTypes from "prop-types";
import { TextField, withStyles } from "@material-ui/core";
import styles from "./styles";

const Input = ({
  classes,
  value,
  type,
  label,
  handleChange,
  keyPressCall,
  ...props
}) => (
  <TextField
    value={value}
    id={`textField-${label}`}
    className={classes.textField}
    variant={type}
    label={label}
    onChange={handleChange}
    onKeyPress={(event) => {
      event.key === "Enter" && keyPressCall();
    }}
    {...props}
  />
);

Input.defaultProps = {
  classes: {},
  type: "standard",
  keyPressCall: () => {},
};

Input.propTypes = {
  classes: PropTypes.object,
  value: PropTypes.string.isRequired,
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  keyPressCall: PropTypes.func,
};

export default withStyles(styles)(Input);
