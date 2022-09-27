import React from "react";
import PropTypes from "prop-types";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import { useEffect } from "react";
import { useState } from "react";

const TimeSeriesDataTable = (props) => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    let tempTableData = [];

    props.timeSeriesData.forEach((singleData, index) => {
      let tempObject = {
        id: index,
        Timestamp: singleData.timestamp,
        Value: singleData.value,
      };
      tempTableData.push(tempObject);
    });
    setTableData(tempTableData);
  });
  const products = tableData;
  const columns = [
    {
      dataField: "Timestamp",
      text: "Timestamp",
    },
    {
      dataField: "Value",
      text: "Value",
    },
  ];

  return (
    <BootstrapTable
      keyField="id"
      data={products}
      columns={columns}
      classes="text-white"
    />
  );
};

export default TimeSeriesDataTable;
