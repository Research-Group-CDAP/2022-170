import { Icon } from "@iconify/react";
import { Chip } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import DoneIcon from "@mui/icons-material/Done";
import clsx from "clsx";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ServiceInfo from "./ServiceInfo";

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
  const classes = useStyles();
  const fastProviderReducer = useSelector((state) => state.fastProviderReducer);
  const [services, setServices] = useState([]);
  const [service, setService] = useState();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  useEffect(() => {
    setServices(fastProviderReducer.services);
  }, [fastProviderReducer.services]);

  const toggleDrawer = (anchor, open, service) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setService(service);
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, true)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <ServiceInfo service={service} />
    </div>
  );

  return (
    <div className={classes.root}>
      <React.Fragment key={"right"}>
        <List component="nav" aria-label="main mailbox folders">
          {services.map((service) => {
            return (
              <ListItem
                button
                className={classes.ListItem}
                onClick={toggleDrawer("right", true, service)}
              >
                <ListItemIcon className={classes.ListItemIcon}>
                  <Icon icon="logos:docker-icon" width={35} />
                </ListItemIcon>
                <ListItemText
                  primary={<strong style={{ color: "#b3e5fc" }}>{service.serviceName}</strong>}
                  secondary={
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
                  secondary={<span>Created: {moment(service.createdAt).format("llll")}</span>}
                />
                <ListItemText
                  primary={
                    <span>
                      Release Count: <strong>{service.releases.length}</strong>
                    </span>
                  }
                  // secondary={<span>Created At: {moment(service.createdAt).format("llll")}</span>}
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
        <Drawer
          anchor={"right"}
          open={state["right"]}
          onClose={toggleDrawer("right", false, service)}
        >
          {list("right")}
        </Drawer>
      </React.Fragment>
    </div>
  );
};

export default ListService;
