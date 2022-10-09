import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import pods from "../../data/Pods.json";
import PodCard from "./PodCard";

const useStyles = makeStyles({
  root: {
    padding: "2% 5%",
  },
});

const Experiments = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h3>Experiments</h3>
      <Grid container spacing={2}>
        {pods.data.map((pod) => (
          <Grid item lg={4}>
            <PodCard />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Experiments;
