import { Icon } from "@iconify/react";
import { Card, CardContent, Divider } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PredictionLineChart } from "../../components";
import { fetch_All_Pods_By_Namespace } from "../../store/kube-store/kubeActions";
import {
  fetch_All_Cpu_Usage_By_Pod,
  fetch_All_Memory_Utilization_By_Pod,
  fetch_All_Network_Utilization_By_Pod
} from "../../store/matrics-store/matricsActions";
import {
  fetch_Predicted_Cpu_Usage_By_Pod,
  fetch_Predicted_Memory_Utilization_By_Pod,
  fetch_Predicted_Network_Utilization_By_Pod
} from "../../store/prediction-store/predictionActions";

const useStyles = makeStyles({
  root: {
    padding: "2% 2%",
  },
  progressBar: {
    width: "100%",
  },
  fields: {
    width: "100%"
  },
  Divider: {
    background: "#ffffff"
  }
});

const Predictions = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.kubeReducer);
  const matricsState = useSelector((state) => state.matricsReducer);
  const predictionState = useSelector((state) => state.predictionReducer);
  const [podDetailsByNamespaceArray, setPodDetailsByNamespaceArray] = useState(
    []
  );
  const [selectedPodName, setSelectedPodName] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

  const [cpuDataTimeStamps, setCpuDataTimeStamps] = useState([]);
  const [memoryDataTimeStamps, setMemoryDataTimeStamps] = useState([]);
  const [networkDataTimeStamps, setNetworkDataTimeStamps] = useState([]);

  const [prectionDataVaules, setPrectionDataVaules] = useState([]);

  const [status, setStatus] = useState(null);

  const handleChangePodName = (event) => {
    setSelectedPodName(event.target.value);
  };

  const handleChangeType = (event) => {
    setSelectedType(event.target.value);
  };

  //For Fetching Pod Names
  useEffect(() => {
    dispatch(fetch_All_Pods_By_Namespace("default"));
  }, [dispatch]);

  useEffect(() => {
    setPodDetailsByNamespaceArray(state.podDetailsByNamespace);
  }, [state.podDetailsByNamespace]);

  //For setting CPU Data
  useEffect(() => {
    setCpuDataTimeStamps(matricsState.cpuDataByPod);
  }, [matricsState.cpuDataByPod]);

  useEffect(() => {
    setPrectionDataVaules(predictionState.predictedCpuDataByPod);
    predictionState.predictedCpuDataByPod.length && setStatus("success");
  }, [predictionState.predictedCpuDataByPod]);

  //For setting Memory Data
  useEffect(() => {
    setMemoryDataTimeStamps(matricsState.memoryDataByPod);
  }, [matricsState.memoryDataByPod]);

  useEffect(() => {
    setPrectionDataVaules(predictionState.predictedMemoryDataByPod);
    predictionState.predictedMemoryDataByPod.length && setStatus("success");
  }, [predictionState.predictedMemoryDataByPod]);

  //For setting Network Data
  useEffect(() => {
    setNetworkDataTimeStamps(matricsState.networkDataByPod);
  }, [matricsState.networkDataByPod]);

  useEffect(() => {
    setPrectionDataVaules(predictionState.predictedNetworkDataByPod);
    predictionState.predictedNetworkDataByPod.length && setStatus("success");
  }, [predictionState.predictedNetworkDataByPod]);

  const callPredictionApi = () => {
    setStatus("loading");
    if (selectedType === "cpu") {
      dispatch(fetch_Predicted_Cpu_Usage_By_Pod(selectedPodName));
      dispatch(fetch_All_Cpu_Usage_By_Pod(selectedPodName));
    }
    if (selectedType === "memory") {
      dispatch(fetch_Predicted_Memory_Utilization_By_Pod(selectedPodName));
      dispatch(fetch_All_Memory_Utilization_By_Pod(selectedPodName));
    }
    if (selectedType === "network") {
      dispatch(fetch_Predicted_Network_Utilization_By_Pod(selectedPodName));
      dispatch(fetch_All_Network_Utilization_By_Pod(selectedPodName));
    }
  };

  return (
    <div className={classes.root}>
      <h3>Predictions</h3>
      <br />
      <div>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <div>
              <h6>Pod Name </h6>
              <FormControl variant="filled" className={classes.fields}>
                <Select
                  native
                  value={selectedPodName}
                  fullWidth
                  className={classes.fields}
                  onChange={handleChangePodName}
                  inputProps={{
                    name: "age",
                    id: "filled-age-native-simple",
                  }}
                >
                  <option aria-label="None" value="" />
                  {podDetailsByNamespaceArray.map((pod) => {
                    return <option value={pod.name}>{pod.name}</option>;
                  })}
                </Select>
              </FormControl>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div>
              <h6>Type </h6>
              <FormControl variant="filled" className={classes.fields}>
                <Select
                  native
                  value={selectedType}
                  onChange={handleChangeType}
                  className={classes.fields}
                  inputProps={{
                    name: "age",
                    id: "filled-age-native-simple",
                  }}
                >
                  <option aria-label="None" value="" />
                  <option value={"cpu"}>CPU</option>
                  <option value={"memory"}>Memory</option>
                  <option value={"network"}>Network</option>
                </Select>
              </FormControl>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  callPredictionApi();
                }}
              >
                PREDICT
              </Button>
            </div>
          </Grid>
          <Grid item xs={12} container justify="center">
            {/* {status === null && (
              <img
                src={WorldImage}
                width="500px"
                height="500px"
                alt={WorldImage}
              />
            )} */}
            {status === "loading" && (
              <div className={classes.progressBar}>
                <LinearProgress />
              </div>
            )}
            {status === "success" && selectedType === "cpu" && (
              <PredictionLineChart
                title={"Predicted CPU Usage"}
                timeSeriesData={cpuDataTimeStamps}
                predictTimeSeriesData={prectionDataVaules}
              />
            )}
            {status === "success" && selectedType === "memory" && (
              <PredictionLineChart
                title={"Predicted Memory Usage"}
                timeSeriesData={memoryDataTimeStamps}
                predictTimeSeriesData={prectionDataVaules}
              />
            )}
            {status === "success" && selectedType === "network" && (
              <PredictionLineChart
                title={"Predicted Network Usage"}
                timeSeriesData={networkDataTimeStamps}
                predictTimeSeriesData={prectionDataVaules}
              />
            )}
          </Grid>
        </Grid>
        <div className={classes.rootServices}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card className={classes.Card}>
              <CardContent>
                <h5>
                  {" "}
                  <Icon
                    icon="ic:baseline-online-prediction"
                    width={25}
                  />{" "}
                 Predicting
                </h5>
                <Divider className={classes.Divider} />
                <br />
                Developed an algorithm that predicts the microservice's load through the time series data queried from the cluster
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card className={classes.Card}>
              <CardContent>
                <h5>
                  {" "}
                  <Icon icon="ic:baseline-linear-scale" width={25} /> Pro
                  Autoscaling strategy{" "}
                </h5>
                <Divider className={classes.Divider} />
                <br />
                Solution that optimizes the autoscaling strategy based on a clustered matrix and the predicted load
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card className={classes.Card}>
              <CardContent>
                <h5>
                  {" "}
                  <Icon
                    icon="ic:baseline-ac-unit"
                    width={25}
                  />{" "}
                 Effectiveness {" "}
                </h5>
                <Divider className={classes.Divider} />
                <br />
                Evaluate the effectiveness of the proposed deployment strategy of the optimization server compared to the existing strategy
              </CardContent>
            </Card>
          </Grid>
         
        </Grid>
      </div>
      </div>
    </div>
  );
};

export default Predictions;
