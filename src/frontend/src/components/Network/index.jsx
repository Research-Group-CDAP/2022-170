import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetch_All_Network_Utilization_By_Pod } from "../../store/matrics-store/matricsActions";
import LineChart from "../LineChart";
import TimeSeriesDataTable from "../TimeSeriesDataTable";

const Network = (props) => {

  const dispatch = useDispatch();
  const state = useSelector((state) => state.matricsReducer);
  const [networkTimeSeriesData, setNetworkTimeSeriesData] = useState([]);

  useEffect(() => {
    dispatch(fetch_All_Network_Utilization_By_Pod(props.podName));
  }, [dispatch]);

  useEffect(() => {
    setNetworkTimeSeriesData(state.networkDataByPod);
  }, [state.networkDataByPod]);

  return (
    <div>
      <h3>Network</h3>
      <h6>{props.podName}</h6>
      {networkTimeSeriesData.length && (
        <LineChart title={"Network Usage"} timeSeriesData={networkTimeSeriesData} />
      )}
      <div className="mt-5">
        {networkTimeSeriesData.length && (
          <TimeSeriesDataTable timeSeriesData={networkTimeSeriesData} />
        )}
      </div>
    </div>
  );
};

export default Network;
