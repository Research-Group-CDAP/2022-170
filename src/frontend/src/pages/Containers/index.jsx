import { Add } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import AddService from "./AddService";

const useStyles = makeStyles({
  root: {
    padding: "2% 10%",
  },
});

const Containers = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

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
          <Button variant="contained" startIcon={<Add />} onClick={handleClickOpen}>
            Add Service
          </Button>
          <AddService open={open} handleClose={handleClose} handleClickOpen={handleClickOpen} />
        </Stack>
      </div>
    </div>
  );
};

export default Containers;
