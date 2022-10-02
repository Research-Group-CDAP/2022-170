import { Box, Drawer, TextField, Typography } from "@material-ui/core";
import { Button } from "@mui/material";
import React, { useState } from "react";

const AddService = (props) => {
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
      <Box sx={{ width: 750, padding: 30 }}>
        <Typography style={{ cursor: "move" }} id="draggable-dialog-title">
          Add New Service
        </Typography>
        <Typography variant="body2" style={{ marginBottom: 10 }}>
          Service Information
        </Typography>
        <TextField
          label="Service Name"
          variant="filled"
          placeholder="order-service"
          fullWidth
          name="serviceName"
          onChange={(e) => onChange(e)}
          error={state.error}
        />
        <TextField
          label="Version Tag"
          variant="filled"
          placeholder="v1.0.2"
          fullWidth
          name="serviceName"
          onChange={(e) => onChange(e)}
          error={state.error}
        />
        <Typography variant="body2" style={{ marginTop: 10, marginBottom: 10 }}>
          Repository Information
        </Typography>
        <TextField
          label="Username"
          variant="filled"
          fullWidth
          name="repository.userName"
          onChange={(e) => onChange(e)}
          error={state.error}
        />
        <TextField
          label="Email"
          variant="filled"
          fullWidth
          name="repository.email"
          onChange={(e) => onChange(e)}
          error={state.error}
          type="email"
        />
        <TextField
          label="Password"
          variant="filled"
          fullWidth
          name="repository.password"
          onChange={(e) => onChange(e)}
          error={state.error}
          type="password"
        />
        <TextField
          label="Link"
          variant="filled"
          fullWidth
          name="repository.password"
          onChange={(e) => onChange(e)}
          error={state.error}
        />
        <Box display="flex" justifyContent="right">
          <>
            <Button autoFocus onClick={props.handleClose} variant="text">
              Cancel
            </Button>
            <Button onClick={props.handleClose} variant="text">
              Add
            </Button>
          </>
        </Box>
      </Box>
    </Drawer>
  );
};

export default AddService;
