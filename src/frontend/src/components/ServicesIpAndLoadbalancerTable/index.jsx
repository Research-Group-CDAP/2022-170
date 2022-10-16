import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import axios from "axios";
import { useState, useEffect } from "react";
import {Link} from "react-router-dom"

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  {
    id: "type",
    label: "Type",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "clusterIP",
    label: "Cluster IP",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "loadBalancer",
    label: "Load Balancer",
    minWidth: 150,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "port",
    label: "Port",
    minWidth: 170,
    align: "right",
  },
  {
    id: "link",
    label: "Link",
    minWidth: 100,
    align: "right",
  },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 740,
  },
  labelGreen: {
    color: "#90EE90",
  },
  labelRed: {
    color: "#ed1515",
  },
});

export default function ServicesIpAndLoadbalancerTable(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [clusterIpsAndLoadbalancerList, setClusterIpsAndLoadbalancerList] =
    useState([]);

  function createData(name, type, clusterIP, loadBalancer, port, link) {
    return { name, type, clusterIP, loadBalancer, port, link };
  }

  let rows = props.clusterIpsAndLoadbalancesList
    .map((service) => {
      return createData(
        service.metadata.name,
        service.spec.type,
        service.spec.clusterIP,
        service.status.loadBalancer.ingress &&
          service.status.loadBalancer?.ingress[0].ip,
        service.spec.ports[0].port,
        service.status.loadBalancer.ingress &&
          `${service.spec.ports[0].name}://${service.status.loadBalancer?.ingress[0].ip}:${service.spec.ports[0].port}`
      );
    })
    .sort((a, b) => (a.name < b.name ? -1 : 1));

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === "link" && row["loadBalancer"] ? (
                            <a
                              href={value}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Link
                            </a>
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
