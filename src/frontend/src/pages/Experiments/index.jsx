import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PodCard from "./PodCard";
import { fetch_All_Pods_By_Namespace } from "../../store/kube-store/kubeActions";
import LinearProgress from "@material-ui/core/LinearProgress";
import { RefreshOutlined } from "@material-ui/icons";
import { Button } from "@mui/material";

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

  const onClickRefresh = () => {
    dispatch(fetch_All_Pods_By_Namespace("default"));
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <h3>Experiments</h3>
        </Grid>
        <Grid item xs={6} container justifyContent="flex-end">
          <Button
            variant="outlined"
            startIcon={<RefreshOutlined />}
            disableElevation
            color="inherit"
            className="mr-3"
            onClick={onClickRefresh}
          >
            Refresh
          </Button>
        </Grid>
      </Grid>

      <br />
      {podList.length ? (
        <Grid container spacing={2}>
          {podList.map((pod) => (
            <Grid key={pod.name} item lg={4}>
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
