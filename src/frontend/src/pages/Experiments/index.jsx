import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PodCard from "./PodCard";
import { fetch_All_Pods_By_Namespace } from "../../store/kube-store/kubeActions";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles({
  root: {
    padding: "2% 5%",
  },
});

const Experiments = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.kubeReducer);
  const [podList, setPodList] = useState([]);

  useEffect(() => {
    dispatch(fetch_All_Pods_By_Namespace("default"));
  }, [dispatch]);

  useEffect(() => {
    setPodList(state.podDetailsByNamespace);
  }, [state.podDetailsByNamespace]);

  return (
    <div className={classes.root}>
      <h3>Experiments</h3>
      <br />
      {podList.length ? (
        <Grid container spacing={2}>
          {podList.map((pod) => (
            <Grid item lg={4}>
              <PodCard pod={pod} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <LinearProgress />
      )}
    </div>
  );
};

export default Experiments;
