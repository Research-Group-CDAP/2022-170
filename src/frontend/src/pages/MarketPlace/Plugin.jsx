import { Icon } from "@iconify/react";
import { makeStyles } from "@material-ui/styles";
import { Card, CardContent, Divider, Typography } from "@material-ui/core";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import React from "react";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "100%",
  },
}));

const Plugin = (props) => {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(props.plugin.active);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

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
              icon={props.plugin.icon}
              width={20}
              style={{ marginRight: 8 }}
            />
            {props.plugin.pluginName}
          </Typography>
          <Divider style={{ marginBottom: 10, marginTop: 0 }} />
          <Typography
            sx={{ fontSize: 14 }}
            color="text.secondary"
            variant="subtitle1"
            gutterBottom
          >
            {props.plugin.description}
          </Typography>
          <br />

          <Switch
            checked={checked}
            onChange={handleChange}
            color="primary"
            name="checkedB"
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default Plugin;
