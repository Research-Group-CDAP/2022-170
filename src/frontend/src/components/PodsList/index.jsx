import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Dashboard from "@material-ui/icons/Dashboard";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "100%",
    backgroundColor: "#0C0C0C"
  },  
  ListItem: {
    backgroundColor: "#272525",
    marginBottom:"5px"
  },
  ListItemIcon: {
    color: "#ffffff",
  },
}));

const PodsList = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        {props.podList.map((singlePod) => {
          return (
            <ListItem button className={classes.ListItem}>
              <ListItemIcon className={classes.ListItemIcon}>
                <Dashboard />
              </ListItemIcon>
              <ListItemText primary={singlePod.podName} />
            </ListItem>
          );
        })}
      </List>
      <Divider />
    </div>
  );
};

export default PodsList;
