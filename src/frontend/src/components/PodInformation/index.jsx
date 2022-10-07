import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useDispatch, useSelector } from "react-redux";
import { fetch_All_Cpu_Usage_By_Pod } from "../../store/matrics-store/matricsActions";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  paper: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(3),
      width: theme.spacing(20),
      height: theme.spacing(20),
      padding: "10px",
      background: "#5e5e5e",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
  },
}));

const PodInformation = (props) => {
  const classes = useStyles();
  //   const dispatch = useDispatch();
  //   const state = useSelector((state) => state.matricsReducer);
  //   const [cpuTimeSeriesData, setCpuTimeSeriesData] = useState([]);

  //   useEffect(() => {
  //     dispatch(fetch_All_Cpu_Usage_By_Pod(props.podName));
  //   }, [props.podName, dispatch]);

  //   useEffect(() => {
  //     setCpuTimeSeriesData(state.cpuDataByPod);
  //   }, [state.cpuDataByPod]);

  return (
    <div>
      <h3>Pod Information</h3>
      <h6>{props.podName}</h6>
      <br />
      <div className={classes.root}>
        <div className={classes.paper}>
          <Paper elevation={3} align="center" justify="center">
            <p>Node Name</p>
            <p>Sample Node Name</p>
          </Paper>
          <Paper elevation={3} align="center" justify="center">
            <p>PORT</p>
            <p>8082</p>
          </Paper>
          <Paper elevation={3} align="center" justify="center">
            <p>Host IP</p>
            <p>190.253.023.5</p>
          </Paper>
          <Paper elevation={3} align="center" justify="center">
            <p>Pod IP</p>
            <p>190.253.023.5</p>
          </Paper>
          <Paper elevation={3} align="center" justify="center">
            <p>PORT</p>
            <p>8082</p>
          </Paper>
          <Paper elevation={3} align="center" justify="center">
            <p>Host IP</p>
            <p>190.253.023.5</p>
          </Paper>
          <Paper elevation={3} align="center" justify="center">
            <p>Pod IP</p>
            <p>190.253.023.5</p>
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default PodInformation;
