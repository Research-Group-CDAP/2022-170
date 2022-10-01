import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PageRoutes from "../../PageRoutes";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PagesIcon from '@material-ui/icons/Pages';
import MailIcon from "@material-ui/icons/Mail";
import HomeIcon from "@material-ui/icons/Home";
import {
  BrowserRouter as Router,
  Link,
  useLocation
} from "react-router-dom";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    background: "#0C0C0C",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    background: "#272525",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    background: "#272525",
  },
  drawerPaper: {
    width: drawerWidth,
    background: "#272525",
    color: "#ffffff",
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    background: "#171717",
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

  return (
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
          <a style={{ textDecoration: "none" }} href="/">
            <ListItem className={classes.Link} button key={"Home"}>
              <ListItemIcon className={classes.ListItemIcon}>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItem>
          </a>

          <a style={{ textDecoration: "none" }} href="/pods">
            <ListItem className={classes.Link} button key={"Pods"}>
              <ListItemIcon className={classes.ListItemIcon}>
                <PagesIcon />
              </ListItemIcon>
              <ListItemText primary={"Pods"} />
            </ListItem>
          </a>

          <a style={{ textDecoration: "none" }} href="/pods">
            <ListItem className={classes.Link} button key={"Pods"}>
              <ListItemIcon className={classes.ListItemIcon}>
              <MailIcon />
              </ListItemIcon>
              <ListItemText primary={"Pods"} />
            </ListItem>
          </a>
        </List>
      </Drawer>
      <main className={classes.content}>
        <PageRoutes />
      </main>
    </div>
  );
}
