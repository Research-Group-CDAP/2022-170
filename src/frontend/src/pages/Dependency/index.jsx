import LeaderLine from "react-leader-line";
import { useState, useEffect, useRef, forwardRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { fetch_All_Dependency_By_Namespace } from "../../store/kube-store/kubeActions";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  root: {
    padding: "2% 3%",
  },
  card: {
    margin: "30px",
    padding:"5px"
  },paper:{
    padding:"5px",
    background:"#1c1c1c"
  }
});

export default function Dependency() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.kubeReducer);
  const [
    dependencyDetailsByNamespaceArray,
    setDependencyDetailsByNamespaceArray,
  ] = useState([]);

  useEffect(() => {
    dispatch(fetch_All_Dependency_By_Namespace("default"));
  }, [dispatch]);

  useEffect(() => {
    setDependencyDetailsByNamespaceArray(state.dependencyDetailsByNamespace);
  }, [state.dependencyDetailsByNamespace]);

  useEffect(() => {
    state.dependencyDetailsByNamespace.forEach((dependencyList, index) => {
      new LeaderLine(
        document.getElementById(dependencyList.service),
        LeaderLine.pointAnchor(document.getElementById(dependencyList.pod))
      );
      new LeaderLine(
        document.getElementById(dependencyList.pod),
        LeaderLine.pointAnchor(
          document.getElementById(dependencyList.node + "-" + index)
        )
      );
    });
  }, [dependencyDetailsByNamespaceArray]);

  return (
    <div className={classes.root}>
      <h3>Pods</h3><br/>
      <div>
        <Grid container spacing={3}>
          {dependencyDetailsByNamespaceArray.map((dependencyList, index) => {
            return (
             
              <Grid item xs={4}>
                 <Paper elevation={3} className={classes.paper}>
                <div id={dependencyList.service}>
                  <Card className={classes.card}>
                    <CardContent>{dependencyList.service}</CardContent>
                  </Card>
                </div>
                <div id={dependencyList.pod}>
                  <Card className={classes.card}>
                    <CardContent>{dependencyList.pod} </CardContent>
                  </Card>
                </div>
                <div
                  id={dependencyList.node + "-" + index}
                >
                  <Card className={classes.card}>
                    <CardContent>{dependencyList.node}</CardContent>
                  </Card>
                </div>
                </Paper>
              </Grid>
             
            );
          })}
        </Grid>
      </div>
    </div>
  );
}
