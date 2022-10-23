import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import React from "react";
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import axios from "axios";
import ExperimentReport from "./ExperimentReport";
import MuiAlert from '@material-ui/lab/Alert';
import { Icon } from "@iconify/react";
import { Card, CardContent, Divider } from "@material-ui/core";
import ExperimentsAccordion from "./ExperimentsAccordion";
import { useEffect } from "react";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: "#424242",
  },
  tabs: {
    color: "#ffffff",
    backgroundColor: "#424242",
    borderBottom: "1px solid " + theme.palette.tabs.color,
  },
  button: {
    marginRight: "20px"
  },
  Card: {
    backgroundColor: "#6F6F6F",
  },
  Divider: {
    background: "#ffffff"
  },Select:{
    padding:"5px"
  }
}));

const ExperimentSlideDrawer = (props) => {
  const classes = useStyles();
  const [podName] = React.useState(props.podName);
  const [experimentType, setExperimentType] = React.useState();
  const [report, setReport] = React.useState(null);
  const [loadingStatus, setLoadingStatus] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isExecuted, setIsExecuted] = React.useState(false);
  const [experimentList, setExperimentList] = React.useState([]);

  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_MONITORING_SUB_API_ENDPOINT}/experiment/fetchAllExperimentResults`).then((res)=>{
      console.log(res);
      setExperimentList(res.data);
    }).catch((error)=>{
      console.log(error);
    })
  },[])

  const generateYaml = () => {
    setLoadingStatus(true);
    axios.post(`${process.env.REACT_APP_MONITORING_SUB_API_ENDPOINT}/experiment/generateYamlFile/${podName}/${experimentType}`).then((res) => {
      if (res.data === "YAML Generated") {
        setIsExecuted(true);
        setLoadingStatus(false);
        setIsSuccess(true);
      } else {
        setIsExecuted(true);
        setLoadingStatus(false);
        setIsSuccess(false);
      }

    }).catch((error) => {
      setIsExecuted(true);
      setLoadingStatus(false);
      setIsSuccess(false);
    })
  }

  const executeExperiment = () => {
    setLoadingStatus(true);
    axios.post(`${process.env.REACT_APP_MONITORING_SUB_API_ENDPOINT}/experiment/executeExperiment`).then((res) => {
      if (res.data === "Report Generated") {
        setIsExecuted(true);
        setLoadingStatus(false);
        setIsSuccess(true);
      } else {
        setIsExecuted(true);
        setLoadingStatus(false);
        setIsSuccess(false);
      }
    }).catch((error) => {
      setIsExecuted(true);
      setLoadingStatus(false);
      setIsSuccess(false);
    })
  }

  const responseAsJson = () => {
    setLoadingStatus(true);
    axios.post(`${process.env.REACT_APP_MONITORING_MAIN_API_ENDPOINT}/restartmonitoringserver`).then((res) => {
      if (res.data.restart) {
        axios.get(`${process.env.REACT_APP_MONITORING_SUB_API_ENDPOINT}/experiment/responseAsJson`).then((res) => {
          setIsExecuted(true);
          setLoadingStatus(false);
          setIsSuccess(true);
          console.log(res.data)
          setReport(res.data)
        }).catch((error) => {
          setIsExecuted(true);
          setLoadingStatus(false);
          setIsSuccess(false);
        })
      }
    }).catch((error) => {
      setIsExecuted(true);
      setLoadingStatus(false);
      setIsSuccess(false);
    })
  }

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }


  return (
    <div className={classes.root}>
      <div>
        <h2>Let's Run Experiments</h2>
      </div>
      <br />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h6>Pod Name : {podName}</h6>
        </Grid>
        <Grid item xs={12}>
          <h6>Experiment Type</h6>
          <Select
            native
            className={classes.Select}
            value={experimentType}
            onChange={(e) => {
              setExperimentType(e.target.value);
            }}
            inputProps={{
              name: 'age',
              id: 'filled-age-native-simple',
            }}
          >
            <option aria-label="None" value="" />
            <option value={"RandomPodTerminate"}>Experiment 1</option>
            <option value={"Pod_Termination_Dosent_Terminate_Others"}>Experiment 2</option>
            <option value={"All_the_applications_inthat_namespace_are_healthy"}>Experiment 3</option>
          </Select>
        </Grid>
        <Grid item xs={12}>
          <Button className={classes.button} variant="contained" color="primary" onClick={() => {
            generateYaml();
          }}>
            Generate YAML
          </Button>
          <Button className={classes.button} variant="contained" color="primary" onClick={() => {
            executeExperiment();
          }}>
            Execute Experiment
          </Button>
          <Button className={classes.button} variant="contained" color="primary" onClick={() => {
            responseAsJson();
          }}>
            Generate Report
          </Button>
        </Grid>
        <Grid item xs={12}>
          {loadingStatus ? <Alert severity="info">Loading!</Alert> : !isExecuted ? "" : isSuccess ? <Alert severity="success">Succesfully Executed</Alert>
            : <Alert severity="error">Something went wrong!</Alert>
          }
        </Grid>
        <Grid item xs={12} container spacing={3}>
          <Grid item xs={12}>
            <Card className={classes.Card}>
              <CardContent>
                <h5>
                  {" "}
                  <Icon
                    icon="fluent-emoji-flat:test-tube"
                    width={25}
                  />{" "}
                  Experiment 1
                </h5>
                <Divider className={classes.Divider} />
                <br />
                If a random pod is killed, application should remain healthy
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card className={classes.Card}>
              <CardContent>
                <h5>
                  <Icon icon="fluent-emoji-flat:test-tube" width={25} />{" "}
                  Experiment 2
                </h5>
                <Divider className={classes.Divider} />
                <br />
                If a Pod is terminated, other pods should remain running.
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card className={classes.Card}>
              <CardContent>
                <h5>
                  {" "}
                  <Icon
                    icon="fluent-emoji-flat:test-tube"
                    width={25}
                  />{" "}
                  Experiment 3
                </h5>
                <Divider className={classes.Divider} />
                <br />
                If an instance of the application is terminated, all the applications in the given namespace must be healthy
              </CardContent>
            </Card>
          </Grid>

        </Grid>
        <Grid item xs={12}>
          {report &&
            <ExperimentReport report={report} />
          }
        </Grid>
        <Grid item xs={12}>
          {experimentList.length && <ExperimentsAccordion experimentList={experimentList}/>}  
        </Grid>
      </Grid>
    </div>
  );
};

export default ExperimentSlideDrawer;
