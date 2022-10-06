import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  card: {
    background:"#555151",
    marginTop: theme.spacing(2),
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
            <p>Status</p>
            <p>{props.podDetails.status}</p>
            </CardContent>
          </Card>
          <Card className={classes.card}>
            <CardContent>
            <p>Start Time</p>
            <p>{props.podDetails.startTime}</p>
            </CardContent>
          </Card>
          <Card className={classes.card}>
            <CardContent>
              <p>Node Name</p>
              <p>{props.podDetails.nodeName}</p>
            </CardContent>
          </Card>
          <Card className={classes.card}>
            <CardContent>
            <p>Host IP</p>
            <p>{props.podDetails.hostIP}</p>
            </CardContent>
          </Card>
          <Card className={classes.card}>
            <CardContent>
            <p>Image</p>
            <p>{props.podDetails.containerImage}</p>
            </CardContent>
          </Card>
          <Card className={classes.card}>
            <CardContent>
            <p>Pod IP</p>
            <p>{props.podDetails.podIP}</p>
            </CardContent>
          </Card>
          <Card className={classes.card}>
            <CardContent>
            <p>Namespace</p>
            <p>{props.podDetails.namespace}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PodInformation;
