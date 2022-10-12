import { Snackbar } from "@material-ui/core";
import { Add, RefreshOutlined } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import { Alert, Button } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { get_services } from "../../store/fastprovider-store/fastProviderActions";
import AddService from "./AddService";
import ListService from "./ListService";

const useStyles = makeStyles({
  root: {
    padding: "2% 10%",
  },
});

const Containers = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    isSnackBackOpen: false,
  });

  useEffect(() => {
    dispatch(get_services());
  }, [dispatch]);

  // useEffect(() => {
  //   setServices(fastProviderState.services);
  // }, [fastProviderState.services]);

  const getServices = (e) => {
    e.preventDefault();
    dispatch(get_services());
    setState({ ...state, isSnackBackOpen: true });
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setState({ ...state, isSnackBackOpen: false });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <h3>Containers</h3>
      <div>
        <Stack direction="row-reverse">
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleClickOpen}
            disableElevation
          >
            Add Service
          </Button>
          <Button
            variant="outlined"
            startIcon={<RefreshOutlined />}
            onClick={getServices}
            disableElevation
            color="inherit"
            className="mr-3"
          >
            Refresh
          </Button>
          <AddService open={open} handleClose={handleClose} handleClickOpen={handleClickOpen} />
          <AddService open={open} handleClose={handleClose} handleClickOpen={handleClickOpen} />
        </Stack>
        <ListService />
        <Snackbar
          open={state.isSnackBackOpen}
          autoHideDuration={2000}
          onClose={handleCloseSnackBar}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert onClose={handleCloseSnackBar} severity="success" sx={{ width: "100%" }}>
            Container images are refreshed successfully
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default Containers;
