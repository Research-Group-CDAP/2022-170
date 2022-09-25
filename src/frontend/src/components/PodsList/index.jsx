import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Dashboard from "@material-ui/icons/Dashboard";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import CpuUsage from "../CpuUsage";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "100%",
    backgroundColor: "#0C0C0C",
  },
  ListItem: {
    backgroundColor: "#272525",
    marginBottom: "5px",
  },
  ListItemIcon: {
    color: "#ffffff",
  },
  list: {
    width: "800px",
    minHeight: "100vh",
    padding: "5%",
    backgroundColor: "#272525",
    color: "#ffffff",
  },
  fullList: {
    width: "auto",
  },
}));

const PodsList = (props) => {
  const classes = useStyles();

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  //Side Drawer
  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, true)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <CpuUsage />
    </div>
  );

  return (
    <div className={classes.root}>
      <React.Fragment key={"right"}>
        <List component="nav" aria-label="main mailbox folders">
          {props.podList.map((singlePod) => {
            return (
              <ListItem
                button
                className={classes.ListItem}
                onClick={toggleDrawer("right", true)}
              >
                <ListItemIcon className={classes.ListItemIcon}>
                  <Dashboard />
                </ListItemIcon>
                <ListItemText primary={singlePod.podName} />
              </ListItem>
            );
          })}
        </List>
        <Divider />
        <Drawer
          anchor={"right"}
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
        >
          {list("right")}
        </Drawer>
      </React.Fragment>
    </div>
  );
};

export default PodsList;
