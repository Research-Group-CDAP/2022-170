import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useDispatch, useSelector } from "react-redux";
import { fetch_All_Memory_Utilization_By_Pod } from "../../store/matrics-store/matricsActions";
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

const Memory = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.matricsReducer);
  const [memoryTimeSeriesData, setMemoryTimeSeriesData] = useState([]);

  useEffect(() => {
    dispatch(fetch_All_Memory_Utilization_By_Pod(props.podName));
  }, [props.podName, dispatch]);

  useEffect(() => {
    setMemoryTimeSeriesData(state.memoryDataByPod);
  }, [state.memoryDataByPod]);

  return (
    <div>
      <h3>Memory</h3>
      <h6>{props.podName}</h6>

      <div className={classes.root}>
        {memoryTimeSeriesData.length ? (
          <>
            <LineChart
              title={"Memory Usage"}
              timeSeriesData={memoryTimeSeriesData}
            />
            <div className="mt-5">
              <TimeSeriesDataTable timeSeriesData={memoryTimeSeriesData} />
            </div>
          </>
        ) : (
          <LinearProgress />
        )}
      </div>
    </div>
  );
};

export default Memory;
