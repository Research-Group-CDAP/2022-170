import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useDispatch, useSelector } from "react-redux";
import { fetch_All_Cpu_Usage_By_Pod } from "../../store/matrics-store/matricsActions";
import { fetch_All_Predicted_Cpu_Usage_By_Pod } from "../../store/optimize-store/optimizeActions";
import { fetch_Predicted_Cpu_Usage_By_Pod } from "../../store/prediction-store/predictionActions";
import LineChart from "../LineChart";
import TimeSeriesDataTable from "../TimeSeriesDataTable";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const Cpu = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.matricsReducer);
  const predictionState = useSelector((state) => state.predictionReducer);
  const [cpuTimeSeriesData, setCpuTimeSeriesData] = useState([]);
  const [predictedCpuValues, setPredictedCpuValues] = useState([]);

  useEffect(() => {
    dispatch(fetch_All_Cpu_Usage_By_Pod(props.podName));
    dispatch(fetch_All_Predicted_Cpu_Usage_By_Pod(props.podName));
    dispatch(fetch_Predicted_Cpu_Usage_By_Pod(props.podName));
  }, [props.podName, dispatch]);

  useEffect(() => {
    setCpuTimeSeriesData(state.cpuDataByPod);
  }, [state.cpuDataByPod]);

  useEffect(() => {
    setPredictedCpuValues(predictionState.predictedCpuDataByPod);
  }, [predictionState.predictedCpuDataByPod]);

  return (
    <div>
      <h3>CPU</h3>
      <h6>{props.podName}</h6>
      <div className={classes.root}>
        {cpuTimeSeriesData.length && predictedCpuValues.length ? (
          <>
            <LineChart title={"CPU Usage"} titlePredicted={"Predicted CPU Usage"} timeSeriesData={cpuTimeSeriesData} predictedValues={predictedCpuValues}/>
            <div className="mt-5">
              <TimeSeriesDataTable timeSeriesData={cpuTimeSeriesData} />
            </div>
          </>
        ) : (
          <LinearProgress />
        )}
      </div>
    </div>
  );
};

export default Cpu;
