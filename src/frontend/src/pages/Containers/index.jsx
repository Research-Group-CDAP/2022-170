import { Add } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContainerList from "../../components/ContainerList";
import { get_services } from "../../store/fastprovider-store/fastProviderActions";
import AddService from "./AddService";

const useStyles = makeStyles({
  root: {
    padding: "2% 1%",
  },
});

const Containers = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const fastProviderState = useSelector((state) => state.fastProviderReducer);
  const [open, setOpen] = useState(false);
  const [services, setServices] = useState([]);

  useEffect(() => {
    dispatch(get_services());
  }, [dispatch]);

  useEffect(() => {
    setServices(fastProviderState.services);
  }, [fastProviderState.services]);

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
        <ContainerList services={services} />
      </div>
    </div>
  );
};

export default Containers;
