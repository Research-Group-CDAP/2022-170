import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { PodsList } from "../../components";
import podData from "../../data/Pods.json";

const useStyles = makeStyles({
  root: {
  },
});

const Pods = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h1>Pods List</h1>
      <PodsList podList={podData.data} />
    </div>
  );
};

export default Pods;
