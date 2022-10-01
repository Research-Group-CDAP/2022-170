import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useDispatch, useSelector } from "react-redux";
import { fetch_All_Cpu_Usage_By_Pod } from "../../store/matrics-store/matricsActions";
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
  const [cpuTimeSeriesData, setCpuTimeSeriesData] = useState([]);

  useEffect(() => {
    dispatch(fetch_All_Cpu_Usage_By_Pod(props.podName));
  }, [props.podName, dispatch]);

  useEffect(() => {
    setCpuTimeSeriesData(state.cpuDataByPod);
  }, [state.cpuDataByPod]);

  return (
    <div>
      <h3>CPU</h3>
      <h6>{props.podName}</h6>
      <div className={classes.root}>
        {cpuTimeSeriesData.length ? (
          <>
            <LineChart title={"CPU Usage"} timeSeriesData={cpuTimeSeriesData} />
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
