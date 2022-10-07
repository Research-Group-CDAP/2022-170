import { Add } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import { Button } from "@mui/material";
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

  useEffect(() => {
    dispatch(get_services());
  }, [dispatch]);

  // useEffect(() => {
  //   setServices(fastProviderState.services);
  // }, [fastProviderState.services]);

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
          <AddService open={open} handleClose={handleClose} handleClickOpen={handleClickOpen} />
        </Stack>
        <ListService />
      </div>
    </div>
  );
};

export default Containers;
