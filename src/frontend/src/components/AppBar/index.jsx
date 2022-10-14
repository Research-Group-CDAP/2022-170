import { Icon } from "@iconify/react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import {
  Containers,
  Dependency,
  Experiments,
  Home,
  Matrics,
  Overview,
  Pods,
  Predictions,
  Registration,
  Services,
  UserInformation,
  UserLogin,
  MarketPlace,
} from "../../pages";
import { getUserDetails } from "../../store/auth-store/authActions";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    // color: "#ffffff",
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
  },
  ListItemIcon: {
    color: "#ffffff",
  },
  Link: {
    color: "#ffffff",
  },
}));

export default function PermanentDrawerLeft() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.authReducer);
  const kubeState = useSelector((state) => state.kubeReducer);
  const [loginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
    dispatch(getUserDetails());
  }, [dispatch]);

  useEffect(() => {
    if (state.user) {
      setLoginStatus(true);
    } else {
      setLoginStatus(false);
    }
  }, [state.user]);

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
        >
          <h4 className="m-4">KubeMate</h4>
          <Divider />
          <List>
            <Link style={{ textDecoration: "none" }} to="/">
              <ListItem className={classes.Link} button key={"Home"}>
                <ListItemIcon className={classes.ListItemIcon}>
                  <Icon
                    icon="vscode-icons:file-type-homeassistant"
                    width={25}
                  />
                </ListItemIcon>
                <ListItemText primary={"Home"} />
              </ListItem>
            </Link>

            {!loginStatus ? (
              <>
                <Link style={{ textDecoration: "none" }} to="/login">
                  <ListItem className={classes.Link} button key={"Login"}>
                    <ListItemIcon className={classes.ListItemIcon}>
                      <Icon icon="ic:baseline-login" width={25} />
                    </ListItemIcon>
                    <ListItemText primary={"Login"} />
                  </ListItem>
                </Link>
                <Link style={{ textDecoration: "none" }} to="/register">
                  <ListItem className={classes.Link} button key={"Register"}>
                    <ListItemIcon className={classes.ListItemIcon}>
                      <Icon icon="ic:baseline-app-registration" width={25} />
                    </ListItemIcon>
                    <ListItemText primary={"Register"} />
                  </ListItem>
                </Link>
              </>
            ) : (
              <>
                <Link style={{ textDecoration: "none" }} to="/user">
                  <ListItem
                    className={classes.Link}
                    button
                    key={"User Information"}
                  >
                    <ListItemIcon className={classes.ListItemIcon}>
                      <Icon icon="vscode-icons:file-type-jenkins" width={25} />
                    </ListItemIcon>
                    <ListItemText primary={"User Information"} />
                  </ListItem>
                </Link>
                {kubeState.clusterConnected && (
                  <>
                    <Link style={{ textDecoration: "none" }} to="/overview">
                      <ListItem
                        className={classes.Link}
                        button
                        key={"Overview"}
                      >
                        <ListItemIcon className={classes.ListItemIcon}>
                          <Icon
                            icon="vscode-icons:file-type-appsemble"
                            width={25}
                          />
                        </ListItemIcon>
                        <ListItemText primary={"Overview"} />
                      </ListItem>
                    </Link>

                    {state.user.plugins.includes("Services") && (
                      <Link style={{ textDecoration: "none" }} to="/services">
                        <ListItem
                          className={classes.Link}
                          button
                          key={"Services"}
                        >
                          <ListItemIcon className={classes.ListItemIcon}>
                            <Icon
                              icon="vscode-icons:file-type-dependabot"
                              width={25}
                            />
                          </ListItemIcon>
                          <ListItemText primary={"Services"} />
                        </ListItem>
                      </Link>
                    )}

                    {state.user.plugins.includes("Pods") && (
                      <Link style={{ textDecoration: "none" }} to="/pods">
                        <ListItem className={classes.Link} button key={"Pods"}>
                          <ListItemIcon className={classes.ListItemIcon}>
                            <Icon
                              icon="vscode-icons:folder-type-kubernetes"
                              width={25}
                            />
                          </ListItemIcon>
                          <ListItemText primary={"Pods"} />
                        </ListItem>
                      </Link>
                    )}

                    {state.user.plugins.includes("Fast Builder") && (
                      <Link style={{ textDecoration: "none" }} to="/containers">
                        <ListItem
                          className={classes.Link}
                          button
                          key={"Containers"}
                        >
                          <ListItemIcon className={classes.ListItemIcon}>
                            <Icon
                              icon="vscode-icons:folder-type-docker"
                              width={25}
                            />
                          </ListItemIcon>
                          <ListItemText primary={"Containers"} />
                        </ListItem>
                      </Link>
                    )}

                    {state.user.plugins.includes("Predictions") && (
                      <Link
                        style={{ textDecoration: "none" }}
                        to="/predictions"
                      >
                        <ListItem
                          className={classes.Link}
                          button
                          key={"Predictions"}
                        >
                          <ListItemIcon className={classes.ListItemIcon}>
                            <Icon
                              icon="flat-color-icons:combo-chart"
                              width={25}
                            />
                          </ListItemIcon>
                          <ListItemText primary={"Predictions"} />
                        </ListItem>
                      </Link>
                    )}

                    {state.user.plugins.includes("Experiments") && (
                      <Link
                        style={{ textDecoration: "none" }}
                        to="/experiments"
                      >
                        <ListItem
                          className={classes.Link}
                          button
                          key={"Experiments"}
                        >
                          <ListItemIcon className={classes.ListItemIcon}>
                            <Icon
                              icon="fluent-emoji-flat:test-tube"
                              width={25}
                            />
                          </ListItemIcon>
                          <ListItemText primary={"Experiments"} />
                        </ListItem>
                      </Link>
                    )}

                    {state.user.plugins.includes("Dependency") && (
                      <Link style={{ textDecoration: "none" }} to="/dependency">
                        <ListItem
                          className={classes.Link}
                          button
                          key={"Dependency"}
                        >
                          <ListItemIcon className={classes.ListItemIcon}>
                            <Icon
                              icon="vscode-icons:file-type-dependencies"
                              width={25}
                            />
                          </ListItemIcon>
                          <ListItemText primary={"Dependency"} />
                        </ListItem>
                      </Link>
                    )}

                    <Link style={{ textDecoration: "none" }} to="/market">
                      <ListItem
                        className={classes.Link}
                        button
                        key={"Market Place"}
                      >
                        <ListItemIcon className={classes.ListItemIcon}>
                          <Icon
                            icon="vscode-icons:folder-type-plugin"
                            width={25}
                          />
                        </ListItemIcon>
                        <ListItemText primary={"Market Place"} />
                      </ListItem>
                    </Link>
                  </>
                )}
                <Link
                  style={{ textDecoration: "none" }}
                  onClick={() => {
                    localStorage.removeItem("x-auth-token");
                    localStorage.removeItem("clusterConntected");
                    setLoginStatus(false);
                    window.location.href = "/";
                  }}
                >
                  <ListItem className={classes.Link} button key={"Logout"}>
                    <ListItemIcon className={classes.ListItemIcon}>
                      <Icon icon="ic:baseline-logout" width={25} />
                    </ListItemIcon>
                    <ListItemText primary={"Logout"} />
                  </ListItem>
                </Link>
              </>
            )}
          </List>
        </Drawer>
        <main className={classes.content}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/matrics" element={<Matrics />} />
            <Route path="/pods" element={<Pods />} />
            <Route path="/containers" element={<Containers />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/services" element={<Services />} />
            <Route path="/dependency" element={<Dependency />} />
            <Route path="/experiments" element={<Experiments />} />
            <Route path="/predictions" element={<Predictions />} />
            <Route path="/user" element={<UserInformation />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/market" element={<MarketPlace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
