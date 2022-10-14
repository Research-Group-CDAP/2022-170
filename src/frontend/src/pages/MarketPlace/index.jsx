import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Plugin from "./Plugin";
import { fetch_All_Pods_By_Namespace } from "../../store/kube-store/kubeActions";
import LinearProgress from "@material-ui/core/LinearProgress";
import PluginsData from "../../data/Plugins.json";

const useStyles = makeStyles({
  root: {
    padding: "2% 5%",
  },
});

const MarketPlace = () => {
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
      <h3>Market Place</h3>
      <br />
      {PluginsData.data.length ? (
        <Grid container spacing={2}>
          {PluginsData.data.map((singlePlugins) => (
            <Grid item lg={4}>
              <Plugin plugin={singlePlugins} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <LinearProgress />
      )}
    </div>
  );
};

export default MarketPlace;
