import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetch_All_Pods_By_Namespace } from "../../store/kube-store/kubeActions";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

export default function UsageRanker(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.kubeReducer);
  const [podDetailsByNamespaceArray, setPodDetailsByNamespaceArray] = useState(
    []
  );

  useEffect(() => {
    dispatch(fetch_All_Pods_By_Namespace("default"));
  }, [dispatch]);

  useEffect(() => {
    let tempArray = [];
    state.podDetailsByNamespace.forEach((pod) => {
      tempArray.push(pod.name);
    });
    setPodDetailsByNamespaceArray(tempArray);
  }, [state.podDetailsByNamespace]);

  function getSteps() {
    let tempSortedArray = [];
    let tempArray = [];

    tempSortedArray = props.usageList.sort((a, b) => {
      return a.value - b.value;
    });
    tempSortedArray.forEach((singlePod) => {
      tempArray.push(singlePod);
    });
    return tempArray;
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div>
      {podDetailsByNamespaceArray.length && (
        <div className={classes.root}>
          <h5>{props.title}</h5>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map(
              (pod, index) =>
              podDetailsByNamespaceArray.includes(pod.podName) && (
                  <Step key={index}>
                    <StepLabel>{pod.podName}</StepLabel>
                    <StepContent>
                      <Typography>{pod.value}</Typography>
                      <div className={classes.actionsContainer}>
                        <div>
                          <Button
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            className={classes.button}
                          >
                            Back
                          </Button>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={handleNext}
                            className={classes.button}
                          >
                            {activeStep === steps.length - 1
                              ? "Finish"
                              : "Next"}
                          </Button>
                        </div>
                      </div>
                    </StepContent>
                  </Step>
                )
            )}
          </Stepper>
          {activeStep === steps.length && (
            <Paper square elevation={0} className={classes.resetContainer}>
              <Typography>
                All steps completed - you&apos;re finished
              </Typography>
              <Button onClick={handleReset} className={classes.button}>
                Reset
              </Button>
            </Paper>
          )}
        </div>
      )}
    </div>
  );
}
