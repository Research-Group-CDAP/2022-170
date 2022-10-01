import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { PodsList } from "../../components";
import podData from "../../data/Pods.json";

const useStyles = makeStyles({
  root: {
    padding: "2% 10%",
  },
});

const Pods = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h3>Pods</h3>
      <div>
        <PodsList podList={podData.data} />
      </div>
    </div>
  );
};

export default Pods;
