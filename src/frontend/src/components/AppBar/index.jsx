import { Icon } from "@iconify/react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import PageRoutes from "../../PageRoutes";
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
        <h4 className="m-2">
          <img src="/assets/images/kubemate.png" width={35} alt="Kubemate logo" className="mr-2" />
          <strong>KubeMate</strong>
        </h4>
        <Divider />
        <List>
          <a style={{ textDecoration: "none" }} href="/">
            <ListItem className={classes.Link} button key={"Home"}>
              <ListItemIcon className={classes.ListItemIcon}>
                <Icon icon="vscode-icons:file-type-homeassistant" width={25} />
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItem>
          </a>
          <a style={{ textDecoration: "none" }} href="/overview">
            <ListItem className={classes.Link} button key={"Overview"}>
              <ListItemIcon className={classes.ListItemIcon}>
                <Icon icon="vscode-icons:file-type-appsemble" width={25} />
              </ListItemIcon>
              <ListItemText primary={"Overview"} />
            </ListItem>
          </a>
          <a style={{ textDecoration: "none" }} href="/services">
            <ListItem className={classes.Link} button key={"Services"}>
              <ListItemIcon className={classes.ListItemIcon}>
                <Icon icon="vscode-icons:file-type-dependabot" width={25} />
              </ListItemIcon>
              <ListItemText primary={"Services"} />
            </ListItem>
          </a>
          <a style={{ textDecoration: "none" }} href="/pods">
            <ListItem className={classes.Link} button key={"Pods"}>
              <ListItemIcon className={classes.ListItemIcon}>
                <Icon icon="vscode-icons:folder-type-kubernetes" width={25} />
              </ListItemIcon>
              <ListItemText primary={"Pods"} />
            </ListItem>
          </a>
          <a style={{ textDecoration: "none" }} href="/containers">
            <ListItem className={classes.Link} button key={"Containers"}>
              <ListItemIcon className={classes.ListItemIcon}>
                <Icon icon="vscode-icons:folder-type-docker" width={25} />
              </ListItemIcon>
              <ListItemText primary={"Containers"} />
            </ListItem>
          </a>
          <a style={{ textDecoration: "none" }} href="/dependency">
            <ListItem className={classes.Link} button key={"Dependency"}>
              <ListItemIcon className={classes.ListItemIcon}>
                <Icon icon="vscode-icons:file-type-dependencies" width={25} />
              </ListItemIcon>
              <ListItemText primary={"Dependency"} />
            </ListItem>
          </a>
          <a style={{ textDecoration: "none" }} href="/experiments">
            <ListItem className={classes.Link} button key={"Experiments"}>
              <ListItemIcon className={classes.ListItemIcon}>
                <Icon icon="fluent-emoji-flat:test-tube" width={25} />
              </ListItemIcon>
              <ListItemText primary={"Experiments"} />
            </ListItem>
          </a>
          <a style={{ textDecoration: "none" }} href="/predictions">
            <ListItem className={classes.Link} button key={"Predictions"}>
              <ListItemIcon className={classes.ListItemIcon}>
                <Icon icon="flat-color-icons:combo-chart" width={25} />
              </ListItemIcon>
              <ListItemText primary={"Predictions"} />
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
