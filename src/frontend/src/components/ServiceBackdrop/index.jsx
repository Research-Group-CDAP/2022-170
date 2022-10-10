import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Icon } from "@iconify/react";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#424242",
    padding: "3%"
  },
}));

export default function ServiceBackdrop(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h4>Sevice Information</h4>
      <br/>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <p>
            <Icon icon="carbon:cloud-service-management" width={20} /> name :{" "}
            {props.data.name}
          </p>
          <p>
            <Icon icon="ic:baseline-drive-file-rename-outline" width={20} />{" "}
            namespace : {props.data.namespace}
          </p>
          <p>
            <Icon icon="bx:time-five" width={20} /> startTime :{" "}
            {props.data.startTime}
          </p>
          <p>
            <Icon icon="heroicons-solid:status-online" width={20} /> status :{" "}
            {props.data.status}
          </p>
          <p>
            <Icon icon="akar-icons:laptop-device" width={20} /> cpu :{" "}
            {props.data.cpu}
          </p>
          <p>
            <Icon icon="ic:baseline-memory" width={20} /> memory :{" "}
            {props.data.memory}
          </p>
          <p>
            <Icon icon="fa6-solid:circle-nodes" width={20} /> node :{" "}
            {props.data.node}
          </p>
        </Grid>
        <Grid item xs={6}>
          <p>
            <Icon icon="eos-icons:api-outlined" width={20} /> apiVersion :{" "}
            {props.data.apiVersion}
          </p>
          <p>
            <Icon icon="charm:key" width={20} /> uid : {props.data.uid}
          </p>
          <p>
            <Icon icon="mingcute:version-fill" width={20} /> resourceVersion :{" "}
            {props.data.resourceVersion}
          </p>
          <p>
            <Icon icon="carbon:policy" width={20} /> dnsPolicy :{" "}
            {props.data.dnsPolicy}
          </p>
          <p>
            <Icon icon="fa-brands:slack-hash" width={20} /> podHash :{" "}
            {props.data.podHash}
          </p>
          <p>
            <Icon icon="icon-park-twotone:setting-web" width={20} /> kind :
            {props.data.kind}
          </p>
        </Grid>
      </Grid>
    </div>
  );
}
