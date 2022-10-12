import { Icon } from "@iconify/react";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import {
  Card,
  CardContent,
  Chip,
  Divider,
  Typography,
} from "@material-ui/core";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import moment from "moment";
import React from "react";
import Button from '@material-ui/core/Button';
import Drawer from "@material-ui/core/Drawer";
import { ExperimentSlideDrawer } from "../../components";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "100%",
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
    color: "#ffffff",
  },
  fullList: {
    width: "auto",
  },
}));

const PodCard = (props) => {
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
      <ExperimentSlideDrawer podName={podName} />
    </div>
  );

  return (
    <>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography
            sx={{ fontSize: 14 }}
            color="text.secondary"
            variant="subtitle1"
            gutterBottom
          >
            <Icon
              icon="fluent-emoji-flat:test-tube"
              width={20}
              style={{ marginRight: 8 }}
            />
            {props.pod.name}
          </Typography>
          <Typography
            variant="subtitle2"
            component="div"
            style={{ marginBottom: 10 }}
          >
            <Icon
              icon="pajamas:status-health"
              width={20}
              style={{ marginRight: 8 }}
            />
            {props.pod.status === "Running" ? (
              <Typography component="span" style={{ color: "#90EE90" }}>
                Running
              </Typography>
            ) : (
              ""
            )}
          </Typography>
          <Divider style={{ marginBottom: 10, marginTop: 0 }} />
          <Chip
            icon={<AccessTimeIcon fontSize="small" />}
            size="small"
            variant="outlined"
            label={
              "Pod Start Time: " +
              moment(props.pod.startTime).format("YYYY/MM/DD hh:mm")
            }
            style={{ marginRight: 8, marginBottom: 8 }}
          />
          <Chip
            icon={<RestartAltIcon fontSize="small" color="warning" />}
            size="small"
            variant="outlined"
            label={"Restart Count: " + props.pod.restartCount}
            style={{ marginRight: 8, marginBottom: 8 }}
          />
          <Chip
            icon={<Icon icon="octicon:container-24" />}
            size="small"
            variant="outlined"
            label={"Namespace: " + props.pod.namespace}
            style={{ marginRight: 8, marginBottom: 8 }}
          />
          <br />

          <Button variant="contained" color="primary" onClick={toggleDrawer("right", true, props.pod.name)}>
            Run
          </Button>

        </CardContent>
      </Card>
      <Drawer
        anchor={"right"}
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
      >
        {list("right")}
      </Drawer>
    </>
  );
};

export default PodCard;
