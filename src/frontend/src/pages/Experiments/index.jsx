import { makeStyles } from "@material-ui/styles";
import React from "react";
import PodCard from "./PodCard";

const useStyles = makeStyles({
  root: {
    padding: "2% 10%",
  },
});

const Experiments = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h3>Experiments</h3>
      <PodCard />
    </div>
  );
};

export default Experiments;
