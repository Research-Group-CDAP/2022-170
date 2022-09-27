import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetch_All_Cpu_Usage_By_Pod } from "../../store/matrics-store/matricsActions";
import LineChart from "../LineChart";
import TimeSeriesDataTable from "../TimeSeriesDataTable";

const Cpu = (props) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.matricsReducer);
  const [cpuTimeSeriesData, setCpuTimeSeriesData] = useState([]);

  useEffect(() => {
    dispatch(fetch_All_Cpu_Usage_By_Pod(props.podName));
  }, [props.podName, dispatch]);

  useEffect(() => {
    console.log("matricsReducer", state.cpuDataByPod);
    setCpuTimeSeriesData(state.cpuDataByPod);
  }, [state.cpuDataByPod]);

  return (
    <div>
      <h3>CPU</h3>
      <h6>{props.podName}</h6>
      {cpuTimeSeriesData.length && (
        <LineChart timeSeriesData={cpuTimeSeriesData} />
      )}
      <div className="mt-5">
        {cpuTimeSeriesData.length && (
          <TimeSeriesDataTable timeSeriesData={cpuTimeSeriesData} />
        )}
      </div>
    </div>
  );
};

export default Cpu;
