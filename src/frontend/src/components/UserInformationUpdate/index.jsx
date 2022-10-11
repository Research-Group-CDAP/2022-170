import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../store/auth-store/authActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "5% 2%",
    background: "black",
    width: "50%",
  },
  field: {
    margin: "10px",
  },
  TextField: {
    width: "100%",
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const UserInformationUpdate = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.authReducer);
  const [Id, setId] = useState(props.user._id);
  const [fullName, setFullName] = useState(props.user.fullName);
  const [azureUserName, setAzureUserName] = useState(props.user.azureUserName);
  const [azurePassword, setAzurePassword] = useState(props.user.azurePassword);
  const [resourceGroup, setResourceGroup] = useState(props.user.resourceGroup);
  const [clusterName, setClusterName] = useState(props.user.clusterName);
  const [azureSubscriptionId, setAzureSubscriptionId] = useState(
    props.user.azureSubscriptionId
  );

  const [updatedStatus, setUpdatedStatus] = useState(null);

  const onSubmitEdit = () => {
    const updatedData = {
      Id,
      fullName,
      azureUserName,
      azurePassword,
      resourceGroup,
      clusterName,
      azureSubscriptionId,
    };
    dispatch(updateUser(updatedData));
  };

  //If the user edit is success
  useEffect(() => {
    if (state.updated === true) {
      setUpdatedStatus("updated");
    }
  }, [state.updated]);

  return (
    <div className={classes.root}>
      <div>
        <form className={classes.field} noValidate autoComplete="off">
          <TextField
            id="filled-basic"
            label="Full Name"
            variant="filled"
            value={fullName}
            className={classes.TextField}
            onChange={(e) => {
              setFullName(e.target.value);
            }}
          />
        </form>
        <form className={classes.field} noValidate autoComplete="off">
          <TextField
            id="filled-basic"
            label="Azure UserName"
            value={azureUserName}
            variant="filled"
            className={classes.TextField}
            onChange={(e) => {
              setAzureUserName(e.target.value);
            }}
          />
        </form>
        <form className={classes.field} noValidate autoComplete="off">
          <TextField
            id="filled-basic"
            label="Azure Password"
            value={azurePassword}
            variant="filled"
            className={classes.TextField}
            onChange={(e) => {
              setAzurePassword(e.target.value);
            }}
          />
        </form>
        <form className={classes.field} noValidate autoComplete="off">
          <TextField
            id="filled-basic"
            label="Azure Subscription Id"
            value={azureSubscriptionId}
            variant="filled"
            className={classes.TextField}
            onChange={(e) => {
              setAzureSubscriptionId(e.target.value);
            }}
          />
        </form>
        <form className={classes.field} noValidate autoComplete="off">
          <TextField
            id="filled-basic"
            label="Resource Group"
            value={resourceGroup}
            variant="filled"
            className={classes.TextField}
            onChange={(e) => {
              setResourceGroup(e.target.value);
            }}
          />
        </form>
        <form className={classes.field} noValidate autoComplete="off">
          <TextField
            id="filled-basic"
            label="Cluster Name"
            value={clusterName}
            variant="filled"
            className={classes.TextField}
            onChange={(e) => {
              setClusterName(e.target.value);
            }}
          />
        </form>
        <form className={classes.field} noValidate autoComplete="off">
          <Button
            variant="contained"
            color="primary"
            onClick={onSubmitEdit}
            className={classes.TextField}
          >
            Edit
          </Button>
        </form>
        <form className={classes.field} noValidate autoComplete="off">
          {updatedStatus === null ? "": updatedStatus === "updated" ? (
            <Alert severity="success">Updated Succesful!</Alert>
          ) : updatedStatus === "error" ? (
            <Alert severity="error">Something went wrong!</Alert>
          ): ""}
        </form>
      </div>
    </div>
  );
};

export default UserInformationUpdate;
