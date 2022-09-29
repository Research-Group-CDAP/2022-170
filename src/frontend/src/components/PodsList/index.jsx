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
import SlideDrawer from "../SlideDrawer";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "100%",
    backgroundColor: "#171717",
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
    minHeight: "200vh",
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
  const [podName, setPodName] = React.useState();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open, podName) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setPodName(podName);
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
      <SlideDrawer podName={podName} />
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
                onClick={toggleDrawer("right", true, singlePod.podName)}
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
