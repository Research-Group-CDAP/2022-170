import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { RegistrationArea } from "../../components";

const useStyles = makeStyles({
  root: {
    textAlign: "center",
    padding: "5% 20%",
  },
});

const Registration = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <RegistrationArea/>
    </div>
  );
};

export default Registration;
