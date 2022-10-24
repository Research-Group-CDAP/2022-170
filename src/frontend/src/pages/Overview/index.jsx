import React, { useEffect, useState } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles } from "@material-ui/core/styles";
import { OverviewInformation } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import {
  fetch_All_Pods_By_Namespace,
  fetch_All_Services_By_Namespace,
  fetchClusterIpsAndLoadbalancer
} from "../../store/kube-store/kubeActions";
import {
  fetch_All_Cpu_Usage,
  fetch_All_Memory_Utilization,
  fetch_All_Network_Utilization,
} from "../../store/matrics-store/matricsActions";

const useStyles = makeStyles({
  root: {
    padding: "2% 2%",
  },
});

const Overview = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.kubeReducer);
  const matricsState = useSelector((state) => state.matricsReducer);
  const authState = useSelector((state) => state.authReducer);

  const [podList, setPodList] = useState([]);
  const [pods, setPods] = useState(0);
  const [activePods, setActivePods] = useState(0);

  const [serviceList, setServiceList] = useState([]);
  const [services, setServices] = useState(0);
  const [activeServices, setActiveServices] = useState(0);

  const [clusterIpsAndLoadbalancesList, setClusterIpsAndLoadbalancesList] = useState([]);
  
  const [cpuUsage, setCpuUsage] = useState([]);
  const [memoryUsage, setMemoryUsage] = useState([]);
  const [networkUsage, setNetworkUsage] = useState([]);

  useEffect(() => {
    dispatch(fetch_All_Pods_By_Namespace("default"));
    dispatch(fetch_All_Services_By_Namespace("default"));
    dispatch(fetch_All_Cpu_Usage(authState.user._id));
    dispatch(fetch_All_Memory_Utilization(authState.user._id));
    dispatch(fetch_All_Network_Utilization(authState.user._id));
    dispatch(fetchClusterIpsAndLoadbalancer());
  }, [dispatch]);

  useEffect(() => {
    setPods(state.podDetailsByNamespace.length);
    let tempPodArr = state.podDetailsByNamespace.filter(function (pod) {
      return pod.status === "Running";
    });
    setPodList(state.podDetailsByNamespace);
    setActivePods(tempPodArr.length);
  }, [state.podDetailsByNamespace]);

  useEffect(() => {
    setServices(state.servicesDetailsByNamespace.length);
    let tempServiceArr = state.servicesDetailsByNamespace.filter(function (
      service
    ) {
      return service.status === "Running";
    });
    setServiceList(state.servicesDetailsByNamespace);
    setActiveServices(tempServiceArr.length);
  }, [state.servicesDetailsByNamespace]);

  useEffect(() => {
    let tempCpuDataObject = [];

    if (matricsState.cpuData.length) {
      tempCpuDataObject =
        matricsState.cpuData[matricsState.cpuData.length - 1].timeSeriesData;
      setCpuUsage(tempCpuDataObject);
    }
  }, [matricsState.cpuData]);

  useEffect(() => {
    let tempMemoryDataObject = [];

    if (matricsState.memoryData.length) {
      tempMemoryDataObject =
        matricsState.memoryData[matricsState.memoryData.length - 1]
          .timeSeriesData;
      setMemoryUsage(tempMemoryDataObject);
    }
  }, [matricsState.memoryData]);

  useEffect(() => {
    let tempNetworkDataObject = [];

    if (matricsState.networkData.length) {
      tempNetworkDataObject =
        matricsState.networkData[matricsState.networkData.length - 1]
          .timeSeriesData;
      setNetworkUsage(tempNetworkDataObject);
    }
  }, [matricsState.networkData]);

  useEffect(() => {
    if (state.clusterIpsAndLoadbalances.length) {
      setClusterIpsAndLoadbalancesList(state.clusterIpsAndLoadbalances);
    }
  }, [state.clusterIpsAndLoadbalances]);

  return (
    <div className={classes.root}>
      <h3>Overview</h3>
      {pods &&
      activePods &&
      podList &&
      services &&
      activeServices &&
      serviceList &&
      cpuUsage &&
      memoryUsage &&
      networkUsage && 
      clusterIpsAndLoadbalancesList ? (
        <OverviewInformation
          pods={pods}
          activePods={activePods}
          podList={podList}
          services={services}
          activeServices={activeServices}
          serviceList={serviceList}
          cpuUsage={cpuUsage}
          memoryUsage={memoryUsage}
          networkUsage={networkUsage}
          clusterIpsAndLoadbalancesList={clusterIpsAndLoadbalancesList}
        />
      ) : (
        <LinearProgress />
      )}
    </div>
  );
};

export default Overview;
