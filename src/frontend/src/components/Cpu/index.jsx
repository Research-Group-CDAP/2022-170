import { Divider } from "@material-ui/core";
import React from "react";
import LineChart from "../LineChart";
import TimeSeriesDataTable from "../TimeSeriesDataTable";

const Cpu = (props) => {
  return (
    <div>
      <h3>CPU</h3>
      <h6>adservice-75656d5f44-lg5c5</h6>
      <LineChart />
      <div className="mt-5">
        <TimeSeriesDataTable />
      </div>
    </div>
  );
};

export default Cpu;
