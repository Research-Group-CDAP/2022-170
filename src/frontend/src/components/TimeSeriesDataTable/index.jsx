import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import "./timeSeriesDataTable.css"
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from 'react-bootstrap-table2-paginator';
import { useEffect } from "react";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    color: 'white',
    background: "#3d3c3b",
    padding:"5px"
  },
}));

const TimeSeriesDataTable = (props) => {
  const classes = useStyles();
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
      classes="BootstrapTable"
      pagination={ paginationFactory() }
    />
  );
};

export default TimeSeriesDataTable;
