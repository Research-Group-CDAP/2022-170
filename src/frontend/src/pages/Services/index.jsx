import React, { useEffect, useState } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useDispatch, useSelector } from "react-redux";
import { fetch_All_Services_By_Namespace } from "../../store/kube-store/kubeActions";
import { makeStyles } from "@material-ui/core/styles";
import { ServicesList } from "../../components";

const useStyles = makeStyles({
  root: {
    padding: "2% 5%",
  },
});

const Services = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.kubeReducer);
  const [servicesDetailsByNamespaceArray, setServicesDetailsByNamespaceArray] = useState(
    []
  );

  useEffect(() => {
    dispatch(fetch_All_Services_By_Namespace("default"));
  }, [dispatch]);

  useEffect(() => {
    setServicesDetailsByNamespaceArray(state.servicesDetailsByNamespace);
  }, [state.servicesDetailsByNamespace]);

  return (
    <div className={classes.root}>
      <h3>Services</h3>
      <div>
        {servicesDetailsByNamespaceArray.length ? (
          <ServicesList serviceList={servicesDetailsByNamespaceArray}/>
        ) : (
          <LinearProgress />
        )}
      </div>
    </div>
  );
};

export default Services;
