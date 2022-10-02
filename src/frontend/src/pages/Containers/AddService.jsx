import { Box, Drawer, makeStyles, Typography } from "@material-ui/core";
import SaveIcon from "@mui/icons-material/Save";
import { Button } from "@mui/material";
import React, { useState } from "react";
import { InputField } from "../../components/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 750,
    padding: 30,
  },
  mb: {
    marginBottom: 10,
  },
}));

const AddService = (props) => {
  const classes = useStyles();
  const [state, setState] = useState({
    serviceName: "",
    repository: {
      userName: "",
      password: "",
      email: "",
      link: "",
    },
    defaultVersionTag: "",
    error: false,
  });

  const onChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
    console.log(state);
  };
  return (
    <Drawer anchor="right" open={props.open} onClose={props.handleClose}>
      <Box className={classes.root}>
        <Typography style={{ cursor: "move" }} id="draggable-dialog-title">
          Add New Service
        </Typography>
        <Typography variant="body2" style={{ marginBottom: 10 }}>
          Service Information
        </Typography>
        <InputField
          label="Service Name"
          variant="filled"
          placeholder="order-service"
          fullWidth
          className={classes.mb}
          InputProps={{ disableUnderline: true }}
          name="serviceName"
          onChange={(e) => onChange(e)}
          error={state.error}
        />
        <InputField
          label="Version Tag"
          variant="filled"
          placeholder="v1.0.2"
          fullWidth
          className={classes.mb}
          InputProps={{ disableUnderline: true }}
          name="serviceName"
          onChange={(e) => onChange(e)}
          error={state.error}
        />
        <Typography variant="body2" style={{ marginTop: 10, marginBottom: 10 }}>
          Repository Information
        </Typography>
        <InputField
          label="Username"
          variant="filled"
          fullWidth
          className={classes.mb}
          InputProps={{ disableUnderline: true }}
          name="repository.userName"
          onChange={(e) => onChange(e)}
          error={state.error}
        />
        <InputField
          label="Email"
          variant="filled"
          fullWidth
          className={classes.mb}
          InputProps={{ disableUnderline: true }}
          name="repository.email"
          onChange={(e) => onChange(e)}
          error={state.error}
          type="email"
        />
        <InputField
          label="Password"
          variant="filled"
          fullWidth
          className={classes.mb}
          InputProps={{ disableUnderline: true }}
          name="repository.password"
          onChange={(e) => onChange(e)}
          error={state.error}
          type="password"
        />
        <InputField
          label="Link"
          variant="filled"
          fullWidth
          className={classes.mb}
          InputProps={{ disableUnderline: true }}
          name="repository.password"
          onChange={(e) => onChange(e)}
          error={state.error}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end" }}>
          <>
            <Button autoFocus onClick={props.handleClose} variant="text" disableElevation>
              Cancel
            </Button>
            <Button
              onClick={props.handleClose}
              variant="contained"
              disableElevation
              startIcon={<SaveIcon />}
            >
              Save
            </Button>
          </>
        </Box>
      </Box>
    </Drawer>
  );
};

export default AddService;
