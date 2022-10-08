import React, { useEffect, useState } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useDispatch, useSelector } from "react-redux";
import { fetch_All_Pods_By_Namespace } from "../../store/kube-store/kubeActions";
import { makeStyles } from "@material-ui/core/styles";
import { PodsList } from "../../components";

const useStyles = makeStyles({
  root: {
    padding: "2% 5%",
  },
});

const Pods = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.kubeReducer);
  const [podDetailsByNamespaceArray, setPodDetailsByNamespaceArray] = useState(
    []
  );

  useEffect(() => {
    dispatch(fetch_All_Pods_By_Namespace("default"));
  }, [dispatch]);

  useEffect(() => {
    setPodDetailsByNamespaceArray(state.podDetailsByNamespace);
  }, [state.podDetailsByNamespace]);

  return (
    <div className={classes.root}>
      <h3>Pods</h3>
      <div>
        {podDetailsByNamespaceArray.length ? (
          <PodsList podList={podDetailsByNamespaceArray} />
        ) : (
          <LinearProgress />
        )}
      </div>
    </div>
  );
};

export default Pods;
