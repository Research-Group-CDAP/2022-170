import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    background: "#272525",
  },
  labelGreen: {
    color: "#90EE90",
  },
  labelRed: {
    color: "#ed1515",
  },
  formField: {
    width: "100%",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function KubeScaler(props) {
  const classes = useStyles();
  const [replica, setReplica] = useState(1);

  const onManualScale = () => {
    let podNameForScale = props.podName.split("-");
    let scalingData = {
      namespace: "default",
      name: podNameForScale[0],
      replica: parseInt(replica),
    };

    axios
      .post(`${process.env.REACT_APP_KUBE_API_ENDPOINT}/scale/up`, scalingData)
      .then(() => {
        NotificationManager.success("Successful", "Successfully Scaled");
      })
      .catch((error) => {
        NotificationManager.error("Error message", "Something Went Wrong!");
      });
  };

  const onAutoScale = () => {
    let predictiondata = [];
    predictiondata = axios
      .get(`${process.env.REACT_APP_KUBE_API_ENDPOINT}/pred`)
      .then(() => {});

    predictiondata.slice(-30);
    let maxValue = Math.max(predictiondata);
    let rc = axios
      .get(`${process.env.REACT_APP_KUBE_API_ENDPOINT}/recommandValue`)
      .then(() => {});
    if (maxValue > rc) {
      let podNameForScale = props.podName.split("-");
      let scalingData = {
        namespace: "default",
        name: podNameForScale[0],
        replica: replica + 1,
      };

      axios
        .post(
          `${process.env.REACT_APP_KUBE_API_ENDPOINT}/scale/up`,
          scalingData
        )
        .then(() => {})
        .catch((error) => {});
    }
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Kube Scaler | Scale as you want
        </Typography>
        <br />
        <form className={classes.formField} noValidate autoComplete="off">
          <TextField
            id="filled-basic"
            label="Replica Sets"
            type="number"
            variant="filled"
            onClick={(e) => {
              setReplica(e.target.value);
            }}
          />
        </form>
        <br />
        <form className={classes.formField} noValidate autoComplete="off">
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              onManualScale();
            }}
          >
            Manual Scale
          </Button>
        </form>
        {/* <form className={classes.root} noValidate autoComplete="off">
                    <Button variant="contained" color="primary" onClick={() => {
                        onAutoScale();
                    }}>
                        Auto Scale
                    </Button>
                </form> */}
      </CardContent>
      <NotificationContainer />
    </Card>
  );
}
