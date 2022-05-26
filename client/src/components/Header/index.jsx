import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography, withStyles } from "@material-ui/core";

import styles from "./styles";

const Header = ({ classes }) => (
  <Grid item className={classes.header}>
    <header>
      <Typography variant="h4">Chevy's Messenger</Typography>
    </header>
  </Grid>
);

Header.defaultProps = {
  classes: {},
};

Header.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Header);
