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
  }
}));

const ExperimentSlideDrawer = (props) => {
  const classes = useStyles();
  const [podName] = React.useState(props.podName);
  const [experimentType, setExperimentType] = React.useState();
  const [report, setReport] = React.useState(null);
  const [loadingStatus, setLoadingStatus] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const generateYaml = () => {
    setLoadingStatus(true);
    axios.post(`http://localhost:4001/experiment/generateYamlFile/${podName}/${experimentType}`).then((res) => {
      if (res.data === "YAML Generated") {
        setLoadingStatus(false);
        setIsSuccess(true);
      } else {
        setLoadingStatus(false);
        setIsSuccess(false);
      }

    }).catch((error) => {
      setLoadingStatus(false);
      setIsSuccess(false);
    })
  }

  const executeExperiment = () => {
    setLoadingStatus(true);
    axios.post(`http://localhost:4001/experiment/executeExperiment`).then((res) => {
      if (res.data === "Report Generated") {
        setLoadingStatus(false);
        setIsSuccess(true);
      } else {
        setLoadingStatus(false);
        setIsSuccess(false);
      }
    }).catch((error) => {
      setLoadingStatus(false);
      setIsSuccess(false);
    })
  }

  const responseAsJson = () => {
    setLoadingStatus(true);
    axios.post(`http://localhost:4002/restartmonitoringserver`).then((res) => {
      if (res.data.restart) {
        axios.get(`http://localhost:4001/experiment/responseAsJson`).then((res) => {
          setLoadingStatus(false);
          setIsSuccess(true);
          console.log(res.data)
          setReport(res.data)
        }).catch((error) => {
          setLoadingStatus(false);
          setIsSuccess(false);
        })
      }
    }).catch((error) => {
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
            <option value={"RandomPodTerminate"}>RandomPodTerminate</option>
            <option value={"Pod_Termination_Dosent_Terminate_Others"}>Pod_Termination_Dosent_Terminate_Others</option>
            <option value={"All_the_applications_inthat_namespace_are_healthy"}>All_the_applications_inthat_namespace_are_healthy</option>
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
          {loadingStatus ? <Alert severity="info">Loading!</Alert> : isSuccess ? <Alert severity="success">Succesfully Executed</Alert>
            : <Alert severity="error">Something went wrong!</Alert>
          }
        </Grid>
        <Grid item xs={12}>
          {report &&
            <ExperimentReport report={report} />
          }
        </Grid>
      </Grid>
    </div>
  );
};

export default ExperimentSlideDrawer;
