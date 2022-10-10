import LeaderLine from "react-leader-line";
import LinearProgress from "@material-ui/core/LinearProgress";
import React, { useState, useEffect, useRef, forwardRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  fetch_All_Dependency_By_Namespace,
  fetch_All_Services_By_Namespace,
  fetch_All_Pods_By_Namespace,
} from "../../store/kube-store/kubeActions";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Backdrop from "@material-ui/core/Backdrop";
import { ServiceBackdrop } from "../../components";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  root: {
    padding: theme.palette.mainPage.padding,
  },
  card: {
    margin: "30px",
    padding: "5px",
    background: "#242424",
  },
  paper: {
    padding: "5px",
    background: "#424242",
  },
}));

export default function Dependency() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.kubeReducer);
  const [
    dependencyDetailsByNamespaceArray,
    setDependencyDetailsByNamespaceArray,
  ] = useState([]);
  const [servicesArray, setServicesArray] = useState([]);
  const [podsArray, setPodsArray] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [selectServiceDetails, setSelectServiceDetails] = React.useState(null);

  useEffect(() => {
    dispatch(fetch_All_Dependency_By_Namespace("default"));
    dispatch(fetch_All_Services_By_Namespace("default"));
    dispatch(fetch_All_Pods_By_Namespace("default"));
  }, [dispatch]);

  useEffect(() => {
    setDependencyDetailsByNamespaceArray(state.dependencyDetailsByNamespace);
  }, [state.dependencyDetailsByNamespace]);

  useEffect(() => {
    setServicesArray(state.servicesDetailsByNamespace);
  }, [state.servicesDetailsByNamespace]);

  useEffect(() => {
    setPodsArray(state.podDetailsByNamespace);
  }, [state.podDetailsByNamespace]);

  useEffect(() => {
    state.dependencyDetailsByNamespace.forEach((dependencyList, index) => {
      new LeaderLine(
        document.getElementById(dependencyList.service),
        LeaderLine.pointAnchor(document.getElementById(dependencyList.pod))
      );
      new LeaderLine(
        document.getElementById(dependencyList.pod),
        LeaderLine.pointAnchor(
          document.getElementById(dependencyList.node + "-" + index)
        )
      );
    });
  }, [dependencyDetailsByNamespaceArray]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = (serviceName) => {
    setOpen(!open);
    let tempArray = servicesArray.filter(function (service) {
      return service.name === serviceName;
    });
    tempArray.length && setSelectServiceDetails(tempArray[0]);
  };

  return (
    <div className={classes.root}>
      <h3>Dependency Map</h3>
      <br />
      <div>
        {dependencyDetailsByNamespaceArray.length ? (
          <Grid container spacing={3}>
            {dependencyDetailsByNamespaceArray.map((dependencyList, index) => {
              return (
                <Grid item xs={4}>
                  <Paper elevation={3} className={classes.paper}>
                    <div
                      id={dependencyList.service}
                      onClick={() => {
                        handleToggle(dependencyList.service);
                      }}
                    >
                      <Card className={classes.card}>
                        <CardContent>{dependencyList.service}</CardContent>
                      </Card>
                    </div>
                    <div id={dependencyList.pod}>
                      <Card className={classes.card}>
                        <CardContent>{dependencyList.pod} </CardContent>
                      </Card>
                    </div>
                    <div id={dependencyList.node + "-" + index}>
                      <Card className={classes.card}>
                        <CardContent>{dependencyList.node}</CardContent>
                      </Card>
                    </div>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <LinearProgress />
        )}
      </div>
      <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
       {selectServiceDetails !== null ? <ServiceBackdrop data={selectServiceDetails}/> : "" } 
      </Backdrop>
    </div>
  );
}
