import React from "react";
import Xarrow, { useXarrow, Xwrapper } from "react-xarrows";
import Draggable from "react-draggable";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  fetch_All_Dependency_By_Namespace,
  fetch_All_Services_By_Namespace,
  fetch_All_Pods_By_Namespace,
} from "../../store/kube-store/kubeActions";
import Grid from "@material-ui/core/Grid";
import Backdrop from "@material-ui/core/Backdrop";
import { PodBackdrop, ServiceBackdrop } from "../../components";
import { Icon } from "@iconify/react";

const useStyles = makeStyles((theme) => ({
  boxStyle : {
    border: "grey solid 3px",
    borderRadius: "10px",
    background: "#272525",
    padding: "10px",
    marginBottom: "65px",
    "&:hover": {
      background: "#6D6D6D",
      cursor: "default",
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  root: {
    padding: theme.palette.mainPage.padding,
  },
  card: {
    margin: "30px",
    padding: "5px",
    background: "#242424",
    "&:hover": {
      background: "#4d4d4d",
      cursor: "default",
    },
  },
  paper: {
    padding: "5px",
    background: "#424242",
  },
}));

const DraggableBox = ({ id, name, icon }) => {
  const updateXarrow = useXarrow();
  return (
    <Draggable onDrag={updateXarrow} onStop={updateXarrow}>
      <div id={id} className={useStyles().boxStyle}>
        <Icon icon={icon} width={20} /> {name}
      </div>
    </Draggable>
  );
};

export default function Dependency() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.kubeReducer);
  const [
    dependencyDetailsByNamespaceArray,
    setDependencyDetailsByNamespaceArray,
  ] = useState([]);
  const [servicesArray, setServicesArray] = useState([]);
  const [podsArray, setPodsArray] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [selectServiceDetails, setSelectServiceDetails] = React.useState(null);
  const [selectPodDetails, setSelectPodDetails] = React.useState(null);

  useEffect(() => {
    dispatch(fetch_All_Dependency_By_Namespace("default"));
    dispatch(fetch_All_Services_By_Namespace("default"));
    dispatch(fetch_All_Pods_By_Namespace("default"));
  }, [dispatch]);

  useEffect(() => {
    setDependencyDetailsByNamespaceArray(state.dependencyDetailsByNamespace);
  }, [state.dependencyDetailsByNamespace]);

  useEffect(() => {
    setServicesArray(state.servicesDetailsByNamespace);
  }, [state.servicesDetailsByNamespace]);

  useEffect(() => {
    setPodsArray(state.podDetailsByNamespace);
  }, [state.podDetailsByNamespace]);

  const handleClose = () => {
    setOpen(false);
    setSelectServiceDetails(null);
    setSelectPodDetails(null);
  };

  const handleToggleSevice = (serviceName) => {
    setOpen(!open);
    let tempArray = servicesArray.filter(function (service) {
      return service.name === serviceName;
    });
    tempArray.length && setSelectServiceDetails(tempArray[0]);
  };

  const handleTogglePod = (podName) => {
    setOpen(!open);
    let tempArray = podsArray.filter(function (pod) {
      return pod.name.includes(podName);
    });
    tempArray.length && setSelectPodDetails(tempArray[0]);
  };

  return (
    <div className={classes.root}>
      <h3>Dependency Map</h3>
      <br /> <br />
      <Grid container spacing={6}>
        {dependencyDetailsByNamespaceArray.length ? (
          dependencyDetailsByNamespaceArray.map((dependencyList, index) => {
            return (
              <Grid item xs={4}>
                <Xwrapper>
                  <div
                    ondblclick={() => {
                      handleToggleSevice(dependencyList.service);
                    }}
                  >
                    <DraggableBox
                      id={dependencyList.service}
                      name={dependencyList.service}
                      icon={"ic:baseline-developer-board"}
                    />
                  </div>
                  <div
                    ondblclick={() => {
                      handleTogglePod(dependencyList.pod);
                    }}
                  >
                    <DraggableBox
                      id={dependencyList.pod}
                      name={dependencyList.pod}
                      icon={"ic:baseline-shopping-basket"}
                    />
                  </div>

                  <DraggableBox
                    id={dependencyList.node + "-" + index}
                    name={dependencyList.node}
                    icon={"ic:baseline-call-to-action"}
                  />
                  <Xarrow
                    start={dependencyList.service}
                    end={dependencyList.pod}
                  />
                  <Xarrow
                    start={dependencyList.pod}
                    end={dependencyList.node + "-" + index}
                  />
                </Xwrapper>
              </Grid>
            );
          })
        ) : (
          <LinearProgress />
        )}
      </Grid>
      <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        {selectServiceDetails !== null ? (
          <ServiceBackdrop data={selectServiceDetails} />
        ) : (
          ""
        )}
        {selectPodDetails !== null ? (
          <PodBackdrop data={selectPodDetails} />
        ) : (
          ""
        )}
      </Backdrop>
    </div>
  );
}
