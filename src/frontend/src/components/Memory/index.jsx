import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetch_All_Memory_Utilization_By_Pod } from "../../store/matrics-store/matricsActions";
import LineChart from "../LineChart";
import TimeSeriesDataTable from "../TimeSeriesDataTable";

const Memory = (props) => {
 
  const dispatch = useDispatch();
  const state = useSelector((state) => state.matricsReducer);
  const [memoryTimeSeriesData, setMemoryTimeSeriesData] = useState([]);

  useEffect(() => {
    dispatch(fetch_All_Memory_Utilization_By_Pod(props.podName));
  }, [dispatch]);

  useEffect(() => {
    setMemoryTimeSeriesData(state.memoryDataByPod);
  }, [state.memoryDataByPod]);

  return (
    <div>
      <h3>Memory</h3>
      <h6>{props.podName}</h6>
      {memoryTimeSeriesData.length && (
        <LineChart title={"Memory Usage"} timeSeriesData={memoryTimeSeriesData} />
      )}
      <div className="mt-5">
        {memoryTimeSeriesData.length && (
          <TimeSeriesDataTable timeSeriesData={memoryTimeSeriesData} />
        )}
      </div>
    </div>
  );
};

export default Memory;
