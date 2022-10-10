import React, { useEffect, useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useDispatch, useSelector } from "react-redux";
import { fetch_All_Pods_By_Namespace } from "../../store/kube-store/kubeActions";
import { makeStyles } from "@material-ui/core/styles";
import { PodsList } from "../../components";
import Grid from "@material-ui/core/Grid";
import MLImage from "../../assetes/images/mlgif.gif";
import WorldImage from "../../assetes/images/worldgif.gif";

const useStyles = makeStyles({
  root: {
    padding: "2% 2%",
  },
});

const Predictions = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.kubeReducer);
  const [podDetailsByNamespaceArray, setPodDetailsByNamespaceArray] = useState(
    []
  );

  const handleChange = (event) => {
    const name = event.target.name;
  };

  useEffect(() => {
    dispatch(fetch_All_Pods_By_Namespace("default"));
  }, [dispatch]);

  useEffect(() => {
    setPodDetailsByNamespaceArray(state.podDetailsByNamespace);
  }, [state.podDetailsByNamespace]);

  return (
    <div className={classes.root}>
      <h3>Predictions</h3>
      <br />
      <div>
        <Grid container spacing={3}>
          <Grid item xs={5}>
            <div>
              <h5>Pod Name </h5>
              <FormControl variant="filled" className={classes.formControl}>
                <Select
                  native
                  value={state.age}
                  onChange={handleChange}
                  inputProps={{
                    name: "age",
                    id: "filled-age-native-simple",
                  }}
                >
                  {podDetailsByNamespaceArray.map((pod) => {
                    return <option value={pod.name}>{pod.name}</option>;
                  })}
                </Select>
              </FormControl>
            </div>
          </Grid>
          <Grid item xs={5}>
            <div>
              <h5>Type </h5>
              <FormControl variant="filled" className={classes.formControl}>
                <Select
                  native
                  value={state.age}
                  onChange={handleChange}
                  inputProps={{
                    name: "age",
                    id: "filled-age-native-simple",
                  }}
                >
                  <option value={"cpu"}>CPU</option>
                  <option value={"memory"}>Memory</option>
                  <option value={"network"}>Network</option>
                </Select>
              </FormControl>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div>
              <Button variant="contained" color="primary">
                PREDICT
              </Button>
            </div>
          </Grid>
          <Grid item xs={12} container justify="center">
            <img
              src={WorldImage}
              width="500px"
              height="500px"
              alt={WorldImage}
            />
            {/* <img
              src={MLImage}
              width = "80%"
              height = "auto"
              alt={MLImage}
            /> */}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Predictions;
