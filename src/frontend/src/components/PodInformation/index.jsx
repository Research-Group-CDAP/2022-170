import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Icon } from "@iconify/react";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  card: {
    background: "#262626",
    marginTop: theme.spacing(2),
    '&:hover': {
      background: "#6D6D6D",
      cursor: 'default'
    }
  },
  labelGreen: {
    color: "#90EE90",
  },
  labelRed: {
    color: "#ed1515",
  },
}));

const PodInformation = (props) => {
  const classes = useStyles();

  return (
    <div>
      <h3>Pod Information</h3>
      <h6>{props.podName}</h6>
      <br />
      <div className={classes.root}>
        <div>
          <Card className={classes.card}>
            <CardContent>
              <p><Icon icon="ic:twotone-tips-and-updates" width={20} /> Status</p>
              <p>
                {props.podDetails.status === "Running" ? (
                  <span className={classes.labelGreen}>{props.podDetails.status}</span>
                ) : (
                  <span className={classes.labelRed}>Failed</span>
                )}
              </p>
            </CardContent>
          </Card>
          <Card className={classes.card}>
            <CardContent>
              <p> <Icon icon="ic:baseline-access-time-filled" width={20} /> Start Time</p>
              <p>{props.podDetails.startTime}</p>
            </CardContent>
          </Card>
          <Card className={classes.card}>
            <CardContent>
              <p><Icon icon="ic:baseline-call-to-action" width={20} /> Node Name</p>
              <p>{props.podDetails.nodeName}</p>
            </CardContent>
          </Card>
          <Card className={classes.card}>
            <CardContent>
              <p><Icon icon="ic:outline-network-check" width={20} /> Host IP</p>
              <p>{props.podDetails.hostIP}</p>
            </CardContent>
          </Card>
          <Card className={classes.card}>
            <CardContent>
              <p><Icon icon="ic:baseline-broken-image" width={20} /> Container Image</p>
              <p>{props.podDetails.containerImage}</p>
            </CardContent>
          </Card>
          <Card className={classes.card}>
            <CardContent>
              <p><Icon icon="ic:outline-network-check" width={20} /> Pod IP</p>
              <p>{props.podDetails.podIP}</p>
            </CardContent>
          </Card>
          <Card className={classes.card}>
            <CardContent>
              <p><Icon icon="ic:round-space-dashboard" width={20} /> Namespace</p>
              <p>{props.podDetails.namespace}</p>
            </CardContent>
          </Card>
          <Card className={classes.card}>
            <CardContent>
              <p><Icon icon="fa6-solid:code" width={20} /> API Version</p>
              <p>{props.podDetails.apiVersion}</p>
            </CardContent>
          </Card>
          <Card className={classes.card}>
            <CardContent>
              <p><Icon icon="ic:baseline-manage-accounts" width={20} /> Manager</p>
              <p>{props.podDetails.manager}</p>
            </CardContent>
          </Card>
          <Card className={classes.card}>
            <CardContent>
              <p><Icon icon="fa6-solid:code" width={20} /> Resource Version</p>
              <p>{props.podDetails.resourceVersion}</p>
            </CardContent>
          </Card>
          <Card className={classes.card}>
            <CardContent>
              <p><Icon icon="ic:baseline-alternate-email" width={20} /> uid</p>
              <p>{props.podDetails.uid}</p>
            </CardContent>
          </Card>
          <Card className={classes.card}>
            <CardContent>
              <p><Icon icon="ic:baseline-local-police" width={20} /> Image Pull Policy</p>
              <p>{props.podDetails.imagePullPolicy}</p>
            </CardContent>
          </Card>
          <Card className={classes.card}>
            <CardContent>
              <p><Icon icon="ic:baseline-refresh" width={20} /> Restart Policy</p>
              <p>{props.podDetails.restartPolicy}</p>
            </CardContent>
          </Card>
          <Card className={classes.card}>
            <CardContent>
              <p><Icon icon="ic:baseline-format-list-numbered" width={20} /> Restart Count</p>
              <p>{props.podDetails.restartCount}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PodInformation;
