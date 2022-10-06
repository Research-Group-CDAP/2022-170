import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useDispatch, useSelector } from "react-redux";
import { fetch_All_Network_Utilization_By_Pod } from "../../store/matrics-store/matricsActions";
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

const Network = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.matricsReducer);
  const [networkTimeSeriesData, setNetworkTimeSeriesData] = useState([]);

  useEffect(() => {
    dispatch(fetch_All_Network_Utilization_By_Pod(props.podName));
  }, [props.podName, dispatch]);

  useEffect(() => {
    setNetworkTimeSeriesData(state.networkDataByPod);
  }, [state.networkDataByPod]);

  return (
    <div>
      <h3>Network</h3>
      <h6>{props.podName}</h6>

      <div className={classes.root}>
        {networkTimeSeriesData.length ? (
          <>
            <LineChart
              title={"Network Usage"}
              timeSeriesData={networkTimeSeriesData}
            />
            <div className="mt-5">
              <TimeSeriesDataTable timeSeriesData={networkTimeSeriesData} />
            </div>
          </>
        ) : (
          <LinearProgress />
        )}
      </div>
    </div>
  );
};

export default Network;
