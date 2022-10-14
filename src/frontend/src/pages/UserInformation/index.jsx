import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { logintoCluster } from "../../store/auth-store/authActions";
import { clusterConnected, clusterNotConnected } from "../../store/kube-store/kubeActions";
import { useState, useEffect } from "react";
import Backdrop from "@material-ui/core/Backdrop";
import { UserInformationUpdate } from "../../components";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
    background: "black",
  },
  rootPage: {
    padding: "2% 2%",
  },
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  card: {
    background: "#262626",
    marginTop: theme.spacing(2),
    "&:hover": {
      background: "#6D6D6D",
      cursor: "default",
    },
  },
  labelGreen: {
    color: "#90EE90",
    fontSize: "25px"
  },
  labelRed: {
    color: "#ed1515",
    fontSize: "25px"
  },
}));

const UserInformation = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.authReducer);
  const kubeReducer = useSelector((state) => state.kubeReducer);
  const [clusterStatus, setClusterStatus] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(false);

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setClusterStatus(localStorage.getItem("clusterConntected"));
  }, []);

  useEffect(() => {
    if (kubeReducer.clusterConnected) {
      localStorage.setItem("clusterConntected", true);
      setLoadingStatus(false);
      dispatch(clusterConnected());
    } else {
      setLoadingStatus(false);
      dispatch(clusterNotConnected());
    }
  }, [kubeReducer.clusterConnected]);

  const connectWithCluster = () => {
    setLoadingStatus(true);
    const data = {
      azureUserName: state.user?.azureUserName,
      azurePassword: state.user?.azurePassword,
      azureSubscriptionId: state.user?.azureSubscriptionId,
      resourceGroup: state.user?.resourceGroup,
      clusterName: state.user?.clusterName,
    };

    const requestConfigJson = {
      headers: {
        "x-auth-token": localStorage.getItem("x-auth-token"),
        "Content-type": "application/json",
      },
    };

    axios.post(
      `${process.env.REACT_APP_AUTH_API_ENDPOINT}/user/logintoCluster`,
      data,
      requestConfigJson
    ).then((res) => {
      console.log(res.data.connected)
      if(res.data.connected){
        dispatch(logintoCluster(true));
        dispatch(clusterConnected());
        setClusterStatus(true);
        setLoadingStatus(false);
      }else{
        setClusterStatus(false);
        setLoadingStatus(false);
        dispatch(logintoCluster(false));
        dispatch(clusterNotConnected());
      }
    }).catch(() => {
      setClusterStatus(false);
      setLoadingStatus(false);
      dispatch(logintoCluster(false));
      dispatch(clusterNotConnected());
    });

  };

  const removeConnectWithCluster = () => {
    localStorage.removeItem("clusterConntected");
    setClusterStatus(false);
    dispatch(clusterNotConnected());
    //window.location.href = "/";
  };

  return (
    <div className={classes.rootPage}>
      <h3>User Information</h3>
      <br />
      <div className={classes.root}>
        <div>
          <Grid container spacing={3}>
            <Grid item xs={6} container justifyContent="flex-start">
              {kubeReducer.clusterConnected ? (
                <p className={classes.labelGreen}>          <Icon
                  icon="pajamas:status-health"
                  width={20}
                  style={{ marginRight: 8 }}
                />Cluster Connected</p>
              ) : (
                <p className={classes.labelRed}>          <Icon
                  icon="pajamas:status-health"
                  width={20}
                  style={{ marginRight: 8 }}
                />Cluster Not Connected</p>
              )}
            </Grid>
            <Grid item xs={6} container justifyContent="flex-end">
              <Icon
                icon="akar-icons:edit"
                width={35}
                onClick={() => {
                  setOpen(!open);
                }}
              />
            </Grid>

            <Grid item xs={6}>
              <Card className={classes.card}>
                <CardContent>
                  <p>
                    {" "}
                    <Icon
                      icon="ic:outline-supervised-user-circle"
                      width={20}
                    />{" "}
                    Full Name
                  </p>
                  <p>{state.user?.fullName}</p>
                </CardContent>
              </Card>
              <Card className={classes.card}>
                <CardContent>
                  <p>
                    <Icon icon="ic:baseline-email" width={20} /> Email
                  </p>
                  <p>{state.user?.email}</p>
                </CardContent>
              </Card>
              <Card className={classes.card}>
                <CardContent>
                  <p>
                    <Icon
                      icon="ic:baseline-drive-file-rename-outline"
                      width={20}
                    />{" "}
                    azureUserName
                  </p>
                  <p>{state.user?.azureUserName}</p>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card className={classes.card}>
                <CardContent>
                  <p>
                    <Icon icon="ic:sharp-group-work" width={20} /> Resource
                    Group
                  </p>
                  <p>{state.user?.resourceGroup}</p>
                </CardContent>
              </Card>
              <Card className={classes.card}>
                <CardContent>
                  <p>
                    <Icon icon="ic:baseline-all-inclusive" width={20} /> Cluster
                    Name
                  </p>
                  <p>{state.user?.clusterName}</p>
                </CardContent>
              </Card>
              <Card className={classes.card}>
                <CardContent>
                  <p>
                    <Icon icon="ic:baseline-grid-3x3" width={20} />{" "}
                    azureSubscriptionId
                  </p>
                  <p>{state.user?.azureSubscriptionId}</p>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              {loadingStatus ? (
                <Button variant="contained" className={classes.root}>
                  Connecting...
                </Button>
              ) : kubeReducer.clusterConnected ? (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.root}
                    disabled
                  >
                    Connect
                  </Button>
                  <br /> <br />
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.root}
                    onClick={() => {
                      removeConnectWithCluster();
                    }}
                  >
                    Remove Connection
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.root}
                    onClick={() => {
                      connectWithCluster();
                    }}
                  >
                    Connect
                  </Button>
                  <br /> <br />
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.root}
                    disabled
                  >
                    Remove Connection
                  </Button>
                </>
              )}
            </Grid>
          </Grid>
          <Backdrop className={classes.backdrop} open={open}>
            <Grid container spacing={1}>
              <Grid item xs={12} container justifyContent="center">
                <Button
                  onClick={handleClose}
                  variant="contained"
                  color="primary"
                >
                  Close
                </Button>
              </Grid>
              {state.user && (
                <Grid item xs={12} container justifyContent="center">
                  <UserInformationUpdate user={state.user} />
                </Grid>
              )}
            </Grid>
          </Backdrop>
        </div>
      </div>
    </div>
  );
};

export default UserInformation;
