import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    textAlign: "center",
    padding: "5% 20%",
    fontSize: "80px",
  },
});

const Home = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <p>Welcome to KubeMate</p>
    </div>
  );
};

export default Home;
