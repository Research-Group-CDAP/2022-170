import {
  Box,
  Drawer,
  Grid,
  makeStyles,
  Snackbar,
  Typography,
} from "@material-ui/core";
import SaveIcon from "@mui/icons-material/Save";
import { LoadingButton } from "@mui/lab";
import { Alert, Button } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InputField } from "../../components/TextField";
import { register_service } from "../../store/fastprovider-store/fastProviderActions";

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
  const dispatch = useDispatch();
  const fastProviderState = useSelector((state) => state.fastProviderReducer);
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState({
    isSnackBackOpen: false,

    serviceName: "",

    userName: "",
    password: "",
    email: "",
    url: "",

    replicas: 0,
    containerPort: "",

    envId: -1,
    envs: [],

    requestCpu: "",
    requestMemory: "",
    limitsCpu: "",
    limitsMemory: "",

    serviceType: "LoadBalancer",
    portId: -1,
    ports: [],

    initialDelaySeconds: null,
    periodSeconds: null,

    isFormNotValid: false,
  });

  const fetchServices = useCallback(() => {
    if (fastProviderState.serviceRegisterInfo) {
      setIsLoading(false);
    }
  }, [fastProviderState.serviceRegisterInfo]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setState({ ...state, isSnackBackOpen: false });
  };

  const validateForm = () => {
    const data = {
      serviceName:
        state.serviceName.trim().length > 0 ? state.serviceName : null,
      userName: state.userName.trim().length > 0 ? state.userName : null,
      password: state.password.trim().length > 0 ? state.password : null,
      email: state.email.trim().length > 0 ? state.email : null,
      url: state.url.trim().length > 0 ? state.url : null,
      containerPort:
        state.containerPort.trim().length > 0 ? state.containerPort : null,
      envs: validateEnvs() ? state.envs : null,
      svcPorts: validateServicePorts() ? state.ports : null,
    };

    formData = Object.assign({}, data);
    return true;
  };

  const validateEnvs = () => {
    let areEnvsValid = true;
    if (state.envs.length > 0) {
      for (let env of state.envs) {
        console.log(env);
        if (env.name.trim().length > 0 && env.value.trim().length > 0) {
          areEnvsValid = true;
        } else {
          areEnvsValid = false;
          break;
        }
      }
    }
    return areEnvsValid;
  };

  const validateServicePorts = () => {
    let areSvcPortsValid = true;
    if (state.ports.length > 0) {
      for (let port of state.ports) {
        console.log(port);
        if (
          port.name.trim().length > 0 &&
          port.port.trim().length > 0 &&
          port.targetPort.trim().length > 0
        ) {
          areSvcPortsValid = true;
        } else {
          areSvcPortsValid = false;
          break;
        }
      }
    }
    return areSvcPortsValid;
  };

  const submitForm = (event) => {
    event.preventDefault();
    const isFormValid = validateForm();
    console.log(state);

    if (isFormValid) {
      let data = Object.values(formData).map((key) => {
        return key !== null;
      });

      if (!data.includes(false)) {
        const data = {
          serviceName: state.serviceName,
          repository: {
            userName: state.userName,
            email: state.email,
            password: state.password,
            url: state.url,
          },
          deploymentInfo: {
            replicas: state.replicas,
            ports: [{ containerPort: state.containerPort }],
            env: state.envs,
            resources: {
              requests: {
                cpu: state.requestCpu,
                memory: state.requestMemory,
              },
              limits: {
                cpu: state.limitsCpu,
                memory: state.limitsMemory,
              },
            },
          },
          serviceInfo: {
            serviceType: state.serviceType,
            ports: state.ports,
          },
          initialDelaySeconds: state.initialDelaySeconds,
          periodSeconds: state.periodSeconds,
        };

        console.log(data);
        dispatch(register_service(data));
        setIsLoading(true);
      } else {
        setState({ ...state, isFormNotValid: true, isSnackBackOpen: true });
      }
    }
  };

  const onChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const onChangeEnv = (event, index) => {
    setState({
      ...state,
      envs: [
        ...state.envs.slice(0, index),
        Object.assign({}, state.envs[index], {
          [event.target.name]: event.target.value,
        }),
        ...state.envs.slice(index + 1),
      ],
    });
  };

  const onChangePort = (event, index) => {
    setState({
      ...state,
      ports: [
        ...state.ports.slice(0, index),
        Object.assign({}, state.ports[index], {
          [event.target.name]: event.target.value,
        }),
        ...state.ports.slice(index + 1),
      ],
    });
  };

  const addNewEnvItem = (event) => {
    event.preventDefault();
    setState({
      ...state,
      envs: [...state.envs, { id: state.envId + 1, name: "", value: "" }],
      envId: state.envId + 1,
    });
    console.log(state.envs);
  };

  const removeEnvItem = (event, id) => {
    let newEnvs = state.envs.filter((item) => item.id !== id);
    setState({ ...state, envs: newEnvs });
  };

  const addNewPortItem = (event) => {
    event.preventDefault();
    setState({
      ...state,
      ports: [
        ...state.ports,
        {
          id: state.portId + 1,
          name: "",
          port: "",
          targetPort: "",
          protocol: "TCP",
        },
      ],
      portId: state.portId + 1,
    });
    console.log(state.envs);
  };

  const removePortItem = (event, id) => {
    let newPorts = state.ports.filter((item) => item.id !== id);
    setState({ ...state, ports: newPorts });
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
        <Typography variant="body2" style={{ marginTop: 10, marginBottom: 10 }}>
          Repository Information
        </Typography>
        <InputField
          label="Username"
          variant="filled"
          fullWidth
          className={classes.mb}
          InputProps={{ disableUnderline: true }}
          name="userName"
          placeholder="kubeuser"
          onChange={(e) => onChange(e)}
          error={state.isFormNotValid && formData.userName === null}
        />
        <InputField
          label="Email"
          variant="filled"
          fullWidth
          className={classes.mb}
          InputProps={{ disableUnderline: true }}
          name="email"
          placeholder="kube@mate.com"
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
          name="password"
          placeholder="kubepassword"
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
          name="url"
          placeholder="https://github.com/kubemate/yourregistry.git"
          onChange={(e) => onChange(e)}
          error={state.isFormNotValid && formData.url === null}
        />
        <Typography variant="body2" style={{ marginBottom: 10 }}>
          Deployment Information
        </Typography>
        <InputField
          label="Service Replicas"
          variant="filled"
          placeholder="3"
          fullWidth
          className={classes.mb}
          InputProps={{ disableUnderline: true }}
          name="replicas"
          onChange={(e) => onChange(e)}
        />
        <InputField
          label="Container Port"
          variant="filled"
          placeholder="8080"
          fullWidth
          className={classes.mb}
          InputProps={{ disableUnderline: true }}
          name="containerPort"
          onChange={(e) => onChange(e)}
          error={state.isFormNotValid && formData.containerPort === null}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 10,
          }}
        >
          <>
            <Typography
              variant="body2"
              style={{ marginBottom: 5 }}
              component="div"
              color={
                state.isFormNotValid && formData.envs === null ? "error" : ""
              }
            >
              Environmental Variables
            </Typography>
            <Button
              autoFocus
              variant="outlined"
              color="primary"
              disableElevation
              style={{ color: "#fff", fontSize: 11 }}
              onClick={(e) => addNewEnvItem(e)}
            >
              + Add Env Variable
            </Button>
          </>
        </Box>

        {state.envs.map((item, index) => (
          <Grid container spacing={2} key={item.id}>
            <Grid item xs={5}>
              <InputField
                label="Name"
                variant="filled"
                placeholder="ENV_NAME"
                fullWidth
                className={classes.mb}
                InputProps={{ disableUnderline: true }}
                name="name"
                onChange={(e) => onChangeEnv(e, index)}
              />
            </Grid>
            <Grid item xs={5}>
              <InputField
                label="Value"
                variant="filled"
                placeholder="VALUE"
                fullWidth
                className={classes.mb}
                InputProps={{ disableUnderline: true }}
                name="value"
                onChange={(e) => onChangeEnv(e, index)}
              />
            </Grid>
            <Grid item xs={2}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                }}
              >
                <>
                  <Button
                    variant="outlined"
                    disableElevation
                    color="error"
                    style={{ height: 55 }}
                    onClick={(e) => removeEnvItem(e, item.id)}
                  >
                    Remove
                  </Button>
                </>
              </Box>
            </Grid>
          </Grid>
        ))}
        <InputField
          label="Request CPU"
          variant="filled"
          placeholder="100m"
          fullWidth
          className={classes.mb}
          InputProps={{ disableUnderline: true }}
          name="requestCpu"
          onChange={(e) => onChange(e)}
        />
        <InputField
          label="Request Memory"
          variant="filled"
          placeholder="64Mi"
          fullWidth
          className={classes.mb}
          InputProps={{ disableUnderline: true }}
          name="requestMemory"
          onChange={(e) => onChange(e)}
        />
        <InputField
          label="Maximum CPU Limit"
          variant="filled"
          placeholder="200m"
          fullWidth
          className={classes.mb}
          InputProps={{ disableUnderline: true }}
          name="limitsCpu"
          onChange={(e) => onChange(e)}
        />
        <InputField
          label="Maximum Memory Limit"
          variant="filled"
          placeholder="128Mi"
          fullWidth
          className={classes.mb}
          InputProps={{ disableUnderline: true }}
          name="limitsMemory"
          onChange={(e) => onChange(e)}
        />
        <InputField
          label="Initial Delay Seconds"
          variant="filled"
          placeholder="15"
          fullWidth
          className={classes.mb}
          InputProps={{ disableUnderline: true }}
          name="initialDelaySeconds"
          onChange={(e) => onChange(e)}
        />
        <InputField
          label="Period Seconds"
          variant="filled"
          placeholder="5"
          fullWidth
          className={classes.mb}
          InputProps={{ disableUnderline: true }}
          name="periodSeconds"
          onChange={(e) => onChange(e)}
        />

        <Typography variant="body2" style={{ marginBottom: 10 }}>
          Service Information
        </Typography>
        <InputField
          label="Service Type"
          variant="filled"
          placeholder="ClusterIP, NodePort, LoadBalancer"
          fullWidth
          className={classes.mb}
          InputProps={{ disableUnderline: true }}
          name="serviceType"
          onChange={(e) => onChange(e)}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 10,
          }}
        >
          <>
            <Typography
              variant="body2"
              style={{ marginBottom: 5 }}
              color={
                state.isFormNotValid && formData.svcPorts === null
                  ? "error"
                  : ""
              }
            >
              Service Ports
            </Typography>
            <Button
              autoFocus
              variant="outlined"
              color="primary"
              disableElevation
              style={{ color: "#fff", fontSize: 11 }}
              onClick={(e) => addNewPortItem(e)}
            >
              + Add Svc Port
            </Button>
          </>
        </Box>
        {state.ports.map((item, index) => (
          <Grid container spacing={2} key={item.id}>
            <Grid item xs={3}>
              <InputField
                label="Service Port Name"
                variant="filled"
                placeholder="order-service-port"
                fullWidth
                className={classes.mb}
                InputProps={{ disableUnderline: true }}
                name="name"
                onChange={(e) => onChangePort(e, index)}
              />
            </Grid>
            <Grid item xs={2}>
              <InputField
                label="Exposed Port"
                variant="filled"
                placeholder="5000"
                fullWidth
                className={classes.mb}
                InputProps={{ disableUnderline: true }}
                name="port"
                onChange={(e) => onChangePort(e, index)}
              />
            </Grid>
            <Grid item xs={2}>
              <InputField
                label="Container Port"
                variant="filled"
                placeholder="8080"
                fullWidth
                className={classes.mb}
                InputProps={{ disableUnderline: true }}
                name="targetPort"
                onChange={(e) => onChangePort(e, index)}
              />
            </Grid>
            <Grid item xs={3}>
              <InputField
                label="Port Protocol"
                variant="filled"
                placeholder="TCP"
                fullWidth
                className={classes.mb}
                InputProps={{ disableUnderline: true }}
                name="protocol"
                onChange={(e) => onChangePort(e, index)}
              />
            </Grid>
            <Grid item xs={2}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                }}
              >
                <>
                  <Button
                    variant="outlined"
                    disableElevation
                    color="error"
                    style={{ height: 55 }}
                    onClick={(e) => removePortItem(e, item.id)}
                  >
                    Remove
                  </Button>
                </>
              </Box>
            </Grid>
          </Grid>
        ))}

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <>
            <Button
              autoFocus
              onClick={props.handleClose}
              variant="outlined"
              color="info"
              disableElevation
              style={{ marginRight: 10 }}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <LoadingButton
              onClick={(e) => submitForm(e)}
              variant="contained"
              disableElevation
              loading={isLoading}
              startIcon={<SaveIcon />}
            >
              Save
            </LoadingButton>
          </>
        </Box>
      </Box>
      <Snackbar
        open={state.isSnackBackOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackBar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackBar}
          severity="warning"
          sx={{ width: "100%" }}
        >
          Please check the input fields
        </Alert>
      </Snackbar>
    </Drawer>
  );
};

export default AddService;
