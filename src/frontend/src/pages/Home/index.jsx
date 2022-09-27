import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Image from "../../assetes/images/welcomeimage.avif"
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
      <img src={Image} width="400px" height="400px"/>
    </div>
  );
};

export default Home;
