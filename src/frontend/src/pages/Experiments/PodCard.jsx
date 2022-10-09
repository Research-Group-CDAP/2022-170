import { Icon } from "@iconify/react";
import { Button, Card, CardActions, CardContent, Typography } from "@material-ui/core";
import React, { useState } from "react";

// {
//   "name": "adservice-75656d5f44-85nc2",
//   "nodeName": "aks-agentpool-35290233-vmss00000g",
//   "hostIP": "10.224.0.4",
//   "podIP": "10.244.0.18",
//   "containerImage": "gcr.io/google-samples/microservices-demo/adservice:v0.3.6",
//   "namespace": "default",
//   "status": "Running",
//   "startTime": "2022-10-06T06:15:58.000Z"
// },

const PodCard = () => {
  const [state, setState] = useState({
    status: "Running",
  });
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" variant="subtitle1" gutterBottom>
          <Icon icon="fluent-emoji-flat:test-tube" width={20} style={{ marginRight: 8 }} />
          adservice-75656d5f44-5qm57
        </Typography>
        <Typography variant="subtitle2" component="div">
          <Icon icon="pajamas:status-health" width={20} style={{ marginRight: 8 }} />
          {state.status === "Running" ? (
            <Typography component="span" color="success">
              Running
            </Typography>
          ) : (
            ""
          )}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default PodCard;
