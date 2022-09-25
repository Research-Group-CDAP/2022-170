import { Divider } from "@material-ui/core";
import React from "react";
import LineChart from "../LineChart";
import TimeSeriesDataTable from "../TimeSeriesDataTable";

const CpuUsage = (props) => {
  return (
    <div>
      <h3>CPU USAGE</h3>
      <LineChart />
      <div className="mt-5">
        <TimeSeriesDataTable />
      </div>
    </div>
  );
};

export default CpuUsage;
