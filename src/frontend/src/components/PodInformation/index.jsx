import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
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
      <br/>
      <div className={classes.root}>
        <p>Node Name</p>
        <p>Sample Node Name</p>
        <p>PORT</p>
        <p>8082</p>
        <p>Host IP</p>
        <p>190.253.023.5</p>
        <p>Pod IP</p>
        <p>190.253.023.5</p>
      </div>
    </div>
  );
};

export default PodInformation;
