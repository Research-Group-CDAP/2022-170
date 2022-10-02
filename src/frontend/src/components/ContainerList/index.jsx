import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import Dashboard from "@material-ui/icons/Dashboard";
import clsx from "clsx";
import React from "react";
import ContainerInfoDrawer from "./ContainerInfoDrawer";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "100%",
    // backgroundColor: "#171717",
  },
  ListItem: {
    // backgroundColor: "#272525",
    marginBottom: "5px",
  },
  ListItemIcon: {
    color: "#ffffff",
  },
  list: {
    width: "800px",
    minHeight: "200vh",
    padding: "5%",
    // backgroundColor: "#272525",
    color: "#ffffff",
  },
  fullList: {
    width: "auto",
  },
}));

const ContainerList = (props) => {
  const classes = useStyles();
  const [container, setContainer] = React.useState();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open, container) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setContainer(container);
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
      <ContainerInfoDrawer service={container} />
    </div>
  );

  return (
    <div className={classes.root}>
      <React.Fragment key={"right"}>
        <List component="nav" aria-label="main mailbox folders">
          {props.services &&
            props.services.services &&
            props.services.services.length > 0 &&
            props.services.services.map((service) => {
              return (
                <ListItem
                  button
                  className={classes.ListItem}
                  onClick={toggleDrawer("right", true, service)}
                >
                  <ListItemIcon className={classes.ListItemIcon}>
                    <Dashboard />
                  </ListItemIcon>
                  <ListItemText primary={service.service_name} />
                </ListItem>
              );
            })}
        </List>
        <Divider />
        <Drawer anchor={"right"} open={state["right"]} onClose={toggleDrawer("right", false)}>
          {list("right")}
        </Drawer>
      </React.Fragment>
    </div>
  );
};

export default ContainerList;
