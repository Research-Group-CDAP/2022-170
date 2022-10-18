import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import DoughnutChart from "../DoughnutChart";
import OverviewTable from "../OverviewTable";
import UsageRanker from "../UsageRanker";
import ServicesIpAndLoadbalancerTable from "../ServicesIpAndLoadbalancerTable";
import ClusterStatusCard from "../ClusterStatusCard.jsx";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(4),
    textAlign: "center",
    color: "#ffffff",
  },
}));

const OverviewInformation = (props) => {
  const classes = useStyles();
  const [selectedDoughnut, setSelectedDoughnut] = useState("services");

  const onClickPaper = (name) => {
    setSelectedDoughnut(name);
  };

  return (
    <div className={classes.root}>
      <div>
        <Grid container spacing={3}>
          <Grid
            item
            xs={4}
            onClick={() => {
              onClickPaper("services");
            }}
          >
            <Paper className={classes.paper}>
              <h5>Services ( {props.services} )</h5>
              <DoughnutChart
                active={props.activeServices}
                inactive={props.services - props.activeServices}
              />
            </Paper>
          </Grid>
          <Grid
            item
            xs={4}
            onClick={() => {
              onClickPaper("pods");
            }}
          >
            <Paper className={classes.paper}>
              <h5>Pods ( {props.pods} ) </h5>
              <DoughnutChart
                active={props.activePods}
                inactive={props.pods - props.activePods}
              />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <h5>Status </h5>
              <ClusterStatusCard/>
            </Paper>
          </Grid>
        </Grid>
      </div>
      <br />
      <div>
        <OverviewTable
          dataList={
            selectedDoughnut === "services" ? props.serviceList : props.podList
          }
        />
      </div>
      <br />
      <div>
        <ServicesIpAndLoadbalancerTable
          clusterIpsAndLoadbalancesList={props.clusterIpsAndLoadbalancesList}
        />
      </div>
      <br />
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <div>
            {props.cpuUsage.length && (
              <UsageRanker
                title="CPU Usage Ranker"
                usageList={props.cpuUsage}
              />
            )}
          </div>
        </Grid>
        <Grid item xs={4}>
          <div>
            {props.memoryUsage.length && (
              <UsageRanker
                title="Memory Usage Ranker"
                usageList={props.memoryUsage}
              />
            )}
          </div>
        </Grid>
        <Grid item xs={4}>
          <div>
            {props.networkUsage.length && (
              <UsageRanker
                title="Network Usage Ranker"
                usageList={props.networkUsage}
              />
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default OverviewInformation;
