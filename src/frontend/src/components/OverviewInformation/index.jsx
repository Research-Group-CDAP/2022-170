import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import DoughnutChart from "../DoughnutChart";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(4),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const OverviewInformation = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <h5>Services ( {props.services} )</h5>
            <DoughnutChart
              active={props.activeServices}
              inactive={props.services - props.activeServices}
            />
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <h5>Pods ( {props.pods} ) </h5>
            <DoughnutChart
              active={props.activePods}
              inactive={props.pods - props.activePods}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default OverviewInformation;
