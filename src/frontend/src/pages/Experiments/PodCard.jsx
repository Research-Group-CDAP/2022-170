import { Icon } from "@iconify/react";
import { Card, CardContent, Chip, Divider, Typography } from "@material-ui/core";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import moment from "moment";
import React, { useState } from "react";

const PodCard = () => {
  const [state, setState] = useState({
    status: "Running",
  });
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" variant="subtitle1" gutterBottom>
          <Icon icon="fluent-emoji-flat:test-tube" width={20} style={{ marginRight: 8 }} />
          adservice-75656d5f44-5qm57
        </Typography>
        <Typography variant="subtitle2" component="div" style={{ marginBottom: 10 }}>
          <Icon icon="pajamas:status-health" width={20} style={{ marginRight: 8 }} />
          {state.status === "Running" ? (
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
          label={"Pod Start Time: " + moment("2022-10-06T06:15:58.000Z").format("YYYY/MM/DD hh:mm")}
          style={{ marginRight: 8, marginBottom: 8 }}
        />
        <Chip
          icon={<RestartAltIcon fontSize="small" color="warning" />}
          size="small"
          variant="outlined"
          label={"Restart Count: 2"}
          style={{ marginRight: 8, marginBottom: 8 }}
        />
        <Chip
          icon={<Icon icon="octicon:container-24" />}
          size="small"
          variant="outlined"
          label={"Container Name: server"}
          style={{ marginRight: 8, marginBottom: 8 }}
        />
      </CardContent>
    </Card>
  );
};

export default PodCard;
