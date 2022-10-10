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

export default function PodBackdrop(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h4>Pod Information</h4>
      <br/>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <p>
            <Icon icon="carbon:cloud-service-management" width={20} /> name :{" "}
            {props.data.name}
          </p>
          <p>
            <Icon icon="ic:baseline-drive-file-rename-outline" width={20} />{" "}
            node Name : {props.data.nodeName}
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
            <Icon icon="fa6-solid:code" width={20} /> apiVersion :{" "}
            {props.data.apiVersion}
          </p>
          <p>
            <Icon icon="ic:baseline-manage-accounts" width={20} /> manager :{" "}
            {props.data.manager}
          </p>
          <p>
            <Icon icon="ic:baseline-alternate-email" width={20} /> uid :{" "}
            {props.data.uid}
          </p>
        </Grid>
        <Grid item xs={6}>
          <p>
            <Icon icon="ic:baseline-local-police" width={20} /> imagePullPolicy :{" "}
            {props.data.imagePullPolicy}
          </p>
          <p>
            <Icon icon="ic:baseline-refresh" width={20} /> restartPolicy : {props.data.restartPolicy}
          </p>
          <p>
            <Icon icon="ic:baseline-format-list-numbered" width={20} /> restartCount :{" "}
            {props.data.restartCount}
          </p>
          <p>
            <Icon icon="ic:baseline-broken-image" width={20} /> containerImage :{" "}
            {props.data.containerImage}
          </p>
          <p>
            <Icon icon="fa-brands:slack-hash" width={20} /> Host IP :{" "}
            {props.data.hostIP}
          </p>
          <p>
            <Icon icon="fa-brands:slack-hash" width={20} /> Pod IP :{" "}
            {props.data.podIP}
          </p>
        </Grid>
      </Grid>
    </div>
  );
}
