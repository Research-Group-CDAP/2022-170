import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
// import { useDispatch, useSelector } from "react-redux";
// import { fetch_All_Cpu_Usage_By_Pod } from "../../store/matrics-store/matricsActions";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  card: {
    marginTop: "45px",
  },
  button: {
    margin: "5px",
  },
}));

const ClusterStatusCard = (props) => {
  const classes = useStyles();
  //   const dispatch = useDispatch();
  //   const state = useSelector((state) => state.matricsReducer);

  //   useEffect(() => {
  //     dispatch(fetch_All_Cpu_Usage_By_Pod(props.podName));
  //     if (!predictedCpuValues.length) {
  //       dispatch(fetch_Predicted_Cpu_Usage_By_Pod(props.podName));
  //     }
  //   }, [props.podName, dispatch]);

  return (
    <div>
      <div className={classes.card}>
        <h6>Istio</h6>
        <Button variant="contained" color="primary" className={classes.button}>
          Install
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
        >
          Uninstall
        </Button>
      </div>
      <div className={classes.card}>
        <h6>Prometheus</h6>
        <Button variant="contained" color="primary" className={classes.button}>
          Install
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
        >
          Uninstall
        </Button>
      </div>
    </div>
  );
};

export default ClusterStatusCard;
