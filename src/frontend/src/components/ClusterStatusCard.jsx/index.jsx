import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { installIstio, configurePrometheus } from "../../store/auth-store/authActions";
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
  labelGreen: {
    color: "#90EE90",
  },
  labelRed: {
    color: "#ed1515",
  },
}));

const ClusterStatusCard = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.authReducer);
  const [istioInstalled, setIstioInstalled] = useState(
    authState.user.isIstioInstalled
  );
  const [isPrometheusConfigured, setisPrometheusConfigured] = useState(
    authState.user.isPrometheusConfigured
  );

  const onClickInstallIstio = () => {
    setIstioInstalled("Loading")
    dispatch(installIstio(authState.user._id))
  }

  const onClickPrometheusConfigured = () => {
    setisPrometheusConfigured("Loading")
    dispatch(configurePrometheus(authState.user._id))
  }

  useEffect(()=>{
    setIstioInstalled(authState.user.isIstioInstalled);
    setisPrometheusConfigured(authState.user.isPrometheusConfigured)
  },[authState.user])
  
  return (
    <div>
      <div className={classes.card}>
        {istioInstalled === "Loading" && (
          <h6>
            Istio : <span className={classes.labelGreen}>Loading</span>{" "}
          </h6>
        )}
        {istioInstalled === true && (
          <h6>
            Istio : <span className={classes.labelGreen}>Active</span>{" "}
          </h6>
        )}
        {!istioInstalled && (
          <h6>
            Istio : <span className={classes.labelRed}>Inactive</span>{" "}
          </h6>
        )}
        <Button variant="contained" color="primary" className={classes.button} onClick={onClickInstallIstio}>
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
      {isPrometheusConfigured === "Loading" && (
          <h6>
            Prometheus : <span className={classes.labelGreen}>Loading</span>{" "}
          </h6>
        )}
        {isPrometheusConfigured && (
          <h6>
            Prometheus : <span className={classes.labelGreen}>Active</span>{" "}
          </h6>
        )}
        {!isPrometheusConfigured && (
          <h6>
            Prometheus : <span className={classes.labelRed}>Inactive</span>{" "}
          </h6>
        )}
        <Button variant="contained" color="primary" className={classes.button} onClick={onClickPrometheusConfigured}>
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
