import { Icon } from "@iconify/react";
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

const PodCard = (props) => {
  return (
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
      </CardContent>
    </Card>
  );
};

export default PodCard;
