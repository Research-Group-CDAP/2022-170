import { Icon } from "@iconify/react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  Snackbar,
  Typography
} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import { RefreshOutlined } from "@material-ui/icons";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DoneIcon from "@mui/icons-material/Done";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { Alert } from "@mui/material";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip
} from "chart.js";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { InputField } from "../../components/TextField";
import {
  add_relese,
  get_services,
  make_release,
  retry_release
} from "../../store/fastprovider-store/fastProviderActions";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  maxBarThickness: 40,
  maintainAspectRatio: true,
  indexAxis: "y",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "right",
    },
    title: {
      display: true,
      text: "Chart.js Horizontal Bar Chart",
    },
  },
};

const labels = [""];

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "100%",
  },
  drawerRoot: {
    width: 600,
    padding: 30,
  },
  ListItem: {
    backgroundColor: "#272525",
    marginBottom: "5px",
  },
  ListItemIcon: {
    color: "#ffffff",
  },
  list: {
    width: "600px",
    minHeight: "auto",
    padding: "5%",
    color: "#ffffff",
  },
  fullList: {
    width: "auto",
  },
}));

const ListService = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const fastProviderReducer = useSelector((state) => state.fastProviderReducer);
  const [services, setServices] = useState([]);
  const [service, setService] = useState();
  const [expanded, setExpanded] = useState();
  const [isSnackBackOpen, setIsSnackBarOpen] = React.useState(false);
  const [version, setVersion] = useState("");
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
    releaseBtnMessage: "release to kubernetes",
    isReleaseBtnDisabled: false,
  });

  const toggleDrawer = (anchor, open, service) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setService(service);
    setState({ ...state, [anchor]: open });
  };

  useEffect(() => {
    if (fastProviderReducer.services.length > 0) {
      console.log("Called 1");
      setServices(fastProviderReducer.services);
    }
  }, [fastProviderReducer.services]);

  useEffect(() => {
    if (fastProviderReducer.releaseInfo) {
      console.log("Called 2");
      setState((s) => (s.right = false));
      setVersion("");
    }

    if (fastProviderReducer.makeRelease) {
      setState((s) => (s.right = false));
    }
  }, [fastProviderReducer.releaseInfo, fastProviderReducer.makeRelease]);

  const onChange = (e) => {
    e.preventDefault();
    setVersion(e.target.value);
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIsSnackBarOpen(false);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const retryRelease = (e) => {
    e.preventDefault();
    dispatch(retry_release(service._id));
    dispatch(get_services());
  };

  const handleNewRelease = (e) => {
    if (version.trim().length > 0) {
      const data = {
        serviceId: service._id,
        version: version,
      };

      dispatch(add_relese(data));
      dispatch(get_services());
      toggleDrawer("right", false, service);
    } else {
      setIsSnackBarOpen(true);
      return;
    }
  };

  const handleReleaseToK8s = (e) => {
    e.preventDefault();
    setState({
      ...state,
      releaseBtnMessage: "Releasing to Kubernetes...",
      isReleaseBtnDisabled: true,
    });
    dispatch(make_release(service._id));
  };

  return (
    <div className={classes.root}>
      <React.Fragment key={"right"}>
        <List component="nav" aria-label="main mailbox folders">
          {services.map((service) => {
            return (
              <ListItem
                key={service._id}
                button
                className={classes.ListItem}
                onClick={toggleDrawer("right", true, service)}
              >
                <ListItemIcon className={classes.ListItemIcon}>
                  <Icon icon="logos:docker-icon" width={35} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <strong style={{ color: "#b3e5fc" }}>
                      {service.serviceName}
                    </strong>
                  }
                  secondary={
                    <span
                      style={{
                        color:
                          service.status === "Building" ||
                          service.status === "Waiting"
                            ? "#ffa000"
                            : service.status === "In-Progress"
                            ? "#29b6f6"
                            : service.status === "Pushing"
                            ? "#dce775"
                            : service.status === "Release-Completed"
                            ? "#4caf50"
                            : service.status === "Push-Completed"
                            ? "#8bc34a"
                            : service.status === "Failed"
                            ? "#ff3d00"
                            : "white",
                      }}
                    >
                      {service.status}
                    </span>
                  }
                />

                <ListItemText
                  primary={
                    <span>
                      Updated:{" "}
                      <strong style={{ color: "#bbdefb" }}>
                        {moment(service.updatedAt).format("llll")}
                      </strong>
                    </span>
                  }
                  secondary={
                    <span>
                      Created: {moment(service.createdAt).format("llll")}
                    </span>
                  }
                />
                <ListItemText
                  primary={
                    <span>
                      Release Count: <strong>{service.releases.length}</strong>
                    </span>
                  }
                />
                <Chip
                  size="medium"
                  variant="outlined"
                  label={
                    <>
                      latest: <strong>{service.latestTag}</strong>
                    </>
                  }
                  deleteIcon={<DoneIcon />}
                />
              </ListItem>
            );
          })}
        </List>
        <Divider />
        {service && service._id && (
          <Drawer
            anchor={"right"}
            open={state["right"]}
            onClose={toggleDrawer("right", false, service)}
          >
            <Box className={classes.drawerRoot}>
              <Typography variant="h6" style={{ fontWeight: "bolder" }}>
                Container Information{" "}
                <Chip
                  variant="outlined"
                  size="small"
                  label={service._id ? service._id.toUpperCase() : ""}
                />
              </Typography>
              <Divider />
              <Typography variant="subtitle1">
                Container Name: {service.serviceName ? service.serviceName : ""}
              </Typography>

              {service.status ? (
                <Typography variant="subtitle1">
                  Status:{" "}
                  <span
                    style={{
                      color:
                        service.status === "Building" || service.status === "Waiting"
                          ? "#ffa000"
                          : service.status === "In-Progress"
                          ? "#29b6f6"
                          : service.status === "Pushing"
                          ? "#dce775"
                          : service.status === "Release-Completed"
                          ? "#4caf50"
                          : service.status === "Push-Completed"
                          ? "#8bc34a"
                          : service.status === "Failed"
                          ? "#ff3d00"
                          : "white",
                    }}
                  >
                    {service.status}
                  </span>
                  {service.status === "Failed" && (
                    <Button
                      variant="outlined"
                      color="default"
                      size="small"
                      onClick={retryRelease}
                      style={{
                        borderRadius: 20,
                        fontSize: 12,
                        height: 20,
                        marginLeft: 8,
                        color: "#ffa000",
                        borderColor: "#ffa000",
                      }}
                    >
                      <RefreshOutlined style={{ width: 15, marginRight: 5 }} />
                      Retry Release
                    </Button>
                  )}
                </Typography>
              ) : (
                ""
              )}
              <Typography variant="subtitle1">
                Latest Tag:{" "}
                {service.latestTag ? (
                  <Chip
                    size="small"
                    variant="outlined"
                    label={<strong>{service.latestTag}</strong>}
                  />
                ) : (
                  ""
                )}
              </Typography>
              <Typography variant="subtitle1">
                Created At:{" "}
                {service.createdAt ? <>{moment(service.createdAt).format("llll")}</> : ""}
              </Typography>
              <Typography variant="subtitle1">
                Updated At:{" "}
                {service.updatedAt ? <>{moment(service.updatedAt).format("llll")}</> : ""}
              </Typography>
              <Typography variant="subtitle1">
                Description: {service.moreInformation ? <>{service.moreInformation}</> : ""}
              </Typography>
              <Divider style={{ marginBottom: 10 }} />
              {service.releases &&
                service.releases.length > 0 &&
                service.releases.map((release, index) => (
                  <Accordion
                    key={release._id}
                    expanded={expanded === release._id}
                    onChange={handleChange(release._id)}
                    elevation={1}
                    style={{ width: "100%" }}
                  >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Icon icon="octicon:container-24" width={23} />
                      <Typography style={{ marginLeft: 5 }}>{service.serviceName}</Typography>
                      <Chip
                        size="small"
                        variant="outlined"
                        style={{ marginLeft: 20, marginRight: 10 }}
                        label={<strong>{release.version}</strong>}
                      />
                      <Chip
                        icon={<AccessTimeIcon style={{ width: 16 }} />}
                        size="small"
                        variant="default"
                        style={{ marginRight: 20 }}
                        label={
                          moment(release.releaseDateTime).format("L") +
                          " " +
                          moment(release.releaseDateTime).format("LT")
                        }
                      />
                      {service.latestTag === release.version && (
                        <RocketLaunchIcon color="success" />
                      )}
                    </AccordionSummary>
                    <AccordionDetails>
                      <div style={{ width: "100%" }}>
                        <Typography variant="subtitle2">
                          Build Start Time: {moment(release.buildStartTime).format("LTS")}
                        </Typography>
                        <Typography variant="subtitle2">
                          Build End Time: {moment(release.buildEndTime).format("LTS")}
                        </Typography>
                        <Typography variant="subtitle2">
                          Push Start Time: {moment(release.pushStartTime).format("LTS")}
                        </Typography>
                        <Typography variant="subtitle2">
                          Push End Time: {moment(release.pushEndTime).format("LTS")}
                        </Typography>
                        <Bar
                          options={options}
                          data={{
                            labels,
                            datasets: [
                              {
                                label: "Push Time (milli seconds)",
                                data: [
                                  moment(release.pushEndTime).diff(
                                    release.pushStartTime,
                                    "milliseconds"
                                  ),
                                ],
                                borderColor: "rgb(255, 99, 132)",
                                backgroundColor: "rgba(255, 99, 132, 0.5)",
                              },
                              {
                                label: "Build Time (seconds)",
                                data: [
                                  moment(release.buildEndTime).diff(
                                    release.buildStartTime,
                                    "seconds"
                                  ),
                                ],
                                borderColor: "rgb(53, 162, 235)",
                                backgroundColor: "rgba(53, 162, 235, 0.5)",
                              },
                            ],
                          }}
                        />
                        {service.latestTag === release.version && (
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "end",
                              alignItems: "flex-end",
                              marginBottom: 10,
                            }}
                          >
                            <Button
                              style={{ width: "auto", marginTop: 10 }}
                              variant="outlined"
                              color="inherit"
                              endIcon={<Icon icon="logos:kubernetes" width={25} />}
                              onClick={handleReleaseToK8s}
                              disabled={state.isReleaseBtnDisabled}
                            >
                              {state.releaseBtnMessage}
                            </Button>
                          </Box>
                        )}
                      </div>
                    </AccordionDetails>
                  </Accordion>
                ))}

              <InputField
                label="Version Tag"
                variant="filled"
                fullWidth
                style={{ marginTop: 10 }}
                InputProps={{ disableUnderline: true }}
                name="version"
                placeholder="v1.0.1"
                onChange={(e) => onChange(e)}
                error={isSnackBackOpen}
              />
              <Button
                // autoFocus
                // onClick={handleClose}
                variant="contained"
                fullWidth
                color="primary"
                size="small"
                disableElevation
                onClick={handleNewRelease}
                // style={{ marginRight: 10, marginTop: 10 }}
                endIcon={<RocketLaunchIcon />}
              >
                Release new version
              </Button>

              <Snackbar
                open={isSnackBackOpen}
                autoHideDuration={2000}
                onClose={handleCloseSnackBar}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <Alert onClose={handleCloseSnackBar} severity="warning" sx={{ width: "100%" }}>
                  Please check the input fields
                </Alert>
              </Snackbar>
            </Box>
          </Drawer>
        )}
      </React.Fragment>
    </div>
  );
};

export default ListService;
