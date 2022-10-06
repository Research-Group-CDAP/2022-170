import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { OverviewInformation } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import {
  fetch_All_Pods_By_Namespace,
  fetch_All_Services_By_Namespace,
} from "../../store/kube-store/kubeActions";

const useStyles = makeStyles({
  root: {
    padding: "2% 4%",
  },
});

const Overview = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.kubeReducer);

  const [pods, setPods] = useState(0);
  const [activePods, setActivePods] = useState(0);

  const [services, setServices] = useState(0);
  const [activeServices, setActiveServices] = useState(0);

  useEffect(() => {
    dispatch(fetch_All_Pods_By_Namespace("default"));
    dispatch(fetch_All_Services_By_Namespace("default"));
  }, [dispatch]);

  useEffect(() => {
    setPods(state.podDetailsByNamespace.length);
    let tempPodArr = state.podDetailsByNamespace.filter(function (pod) {
      return pod.status == "Running";
    });
    setActivePods(tempPodArr.length);
  }, [state.podDetailsByNamespace]);

  useEffect(() => {
    setServices(state.servicesDetailsByNamespace.length);
    let tempServiceArr = state.servicesDetailsByNamespace.filter(function (
      service
    ) {
      return service.status == "Running";
    });
    setActiveServices(tempServiceArr.length);
  }, [state.servicesDetailsByNamespace]);

  return (
    <div className={classes.root}>
      <h1>Overview</h1>
      <OverviewInformation
        pods={pods}
        activePods={activePods}
        services={services}
        activeServices={activeServices}
      />
    </div>
  );
};

export default Overview;
