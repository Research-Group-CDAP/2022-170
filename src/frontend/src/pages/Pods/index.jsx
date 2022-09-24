import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { PodsList } from "../../components";
import podData from "../../data/Pods.json";

const useStyles = makeStyles({
  root: {
    textAlign:"center",
    padding:"5% 20%"
  },
});

const Pods = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h1>Pods</h1>
      <div>
      <PodsList podList={podData.data} />
      </div>
    </div>
  );
};

export default Pods;
