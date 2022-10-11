import { Chip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
  },
  tabs: {
    color: theme.palette.tabs.color,
    backgroundColor: theme.palette.tabs.backgroundColor,
    borderBottom: "1px solid " + theme.palette.tabs.color,
  },
}));

const ContainerInfoDrawer = (props) => {
  const classes = useStyles();
  const [service] = React.useState(props.service);

  return (
    <div className={classes.root}>
      <Typography varient="h2" style={{ fontWeight: "bold", marginBottom: 10 }}>
        Service Image Information
      </Typography>
      <Typography variant="body2" component="div" style={{ marginBottom: 5 }}>
        Fast Provider Ref ID:{" "}
        <Chip
          label={<strong>{service.reference_id.toUpperCase()}</strong>}
          size="small"
          color="info"
        />
      </Typography>
      <Typography variant="body2" component="div" style={{ marginBottom: 5 }}>
        Container Name: <strong>{service.service_name}</strong>
      </Typography>
      <Typography variant="body2" component="div" style={{ marginBottom: 5 }}>
        Current Version: <strong>{service.default_version_tag}</strong>
      </Typography>
      <Typography variant="body2" component="div" style={{ marginBottom: 5 }}>
        Current Status:{" "}
        <Chip
          label={<strong>{service.status.toUpperCase()}</strong>}
          size="small"
          color="primary"
        />
      </Typography>
      <Typography variant="body2" component="div" style={{ marginBottom: 5 }}>
        Service Created At:{" "}
        <strong>
          {moment(service.created_at).format("YYYY-MM-DD hh:mm:ss")}
        </strong>
      </Typography>
      <Typography variant="body2" component="div" style={{ marginBottom: 5 }}>
        Service Last Updated:{" "}
        <strong>
          {moment(service.updated_at).format("YYYY-MM-DD hh:mm:ss")}
        </strong>
      </Typography>
      <Typography
        varient="h2"
        style={{ fontWeight: "bold", marginBottom: 10, marginTop: 10 }}
      >
        Codebase Information
      </Typography>
      <Typography variant="body2" component="div" style={{ marginBottom: 5 }}>
        Username: <strong>{service.repository.user_name}</strong>
      </Typography>
      <Typography variant="body2" component="div" style={{ marginBottom: 5 }}>
        Email: <strong>{service.repository.email}</strong>
      </Typography>
      <Typography variant="body2" component="div" style={{ marginBottom: 5 }}>
        Repo Link:{" "}
        <strong>
          <a href={service.repository.link} target="blank">
            {service.repository.link}
          </a>
        </strong>
      </Typography>
    </div>
  );
};

export default ContainerInfoDrawer;
