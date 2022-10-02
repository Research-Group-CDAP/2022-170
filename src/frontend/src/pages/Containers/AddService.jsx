import { Box, Drawer, makeStyles, Snackbar, Typography } from "@material-ui/core";
import SaveIcon from "@mui/icons-material/Save";
import { Alert, Button } from "@mui/material";
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

let formData = {};
const AddService = (props) => {
  const classes = useStyles();
  const [state, setState] = useState({
    isSnackBackOpen: false,
    serviceName: "",
    repository: {
      userName: "",
      password: "",
      email: "",
      link: "",
    },
    defaultVersionTag: "",
    isFormNotValid: false,
  });

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setState({ ...state, isSnackBackOpen: false });
  };

  const validateForm = () => {
    const data = {
      serviceName: state.serviceName.trim().length > 0 ? state.serviceName : null,
      defaultVersionTag: state.defaultVersionTag.trim().length > 0 ? state.defaultVersionTag : null,
      userName: state.repository.userName.trim().length > 0 ? state.repository.userName : null,
      password: state.repository.password.trim().length > 0 ? state.repository.password : null,
      email: state.repository.email.trim().length > 0 ? state.repository.email : null,
      link: state.repository.link.trim().length > 0 ? state.repository.link : null,
    };

    formData = Object.assign({}, data);
    return true;
  };

  const submitForm = (event) => {
    event.preventDefault();
    const isFormValid = validateForm();

    if (isFormValid) {
      let data = Object.values(formData).map((key) => {
        return key !== null;
      });

      console.log("Prev: ", formData.serviceName === null);
      if (!data.includes(false)) {
        // submit form
      } else {
        setState({ ...state, isFormNotValid: true, isSnackBackOpen: true });
      }
    }
  };

  const onChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
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
          error={state.isFormNotValid && formData.serviceName === null}
        />
        <InputField
          label="Version Tag"
          variant="filled"
          placeholder="v1.0.2"
          fullWidth
          className={classes.mb}
          InputProps={{ disableUnderline: true }}
          name="defaultVersionTag"
          onChange={(e) => onChange(e)}
          error={state.isFormNotValid && formData.defaultVersionTag === null}
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
          error={state.isFormNotValid && formData.userName === null}
        />
        <InputField
          label="Email"
          variant="filled"
          fullWidth
          className={classes.mb}
          InputProps={{ disableUnderline: true }}
          name="repository.email"
          onChange={(e) => onChange(e)}
          error={state.isFormNotValid && formData.email === null}
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
          error={state.isFormNotValid && formData.password === null}
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
          error={state.isFormNotValid && formData.link === null}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end" }}>
          <>
            <Button autoFocus onClick={props.handleClose} variant="text" disableElevation>
              Cancel
            </Button>
            <Button
              onClick={(e) => submitForm(e)}
              variant="contained"
              disableElevation
              startIcon={<SaveIcon />}
            >
              Save
            </Button>
          </>
        </Box>
      </Box>
      <Snackbar
        open={state.isSnackBackOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackBar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSnackBar} severity="warning" sx={{ width: "100%" }}>
          Please check the input fields
        </Alert>
      </Snackbar>
    </Drawer>
  );
};

export default AddService;
