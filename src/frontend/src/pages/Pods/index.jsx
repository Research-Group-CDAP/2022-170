import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { PodsList } from "../../components";
import podData from "../../data/Pods.json";

const useStyles = makeStyles({
  root: {
    textAlign: "center",
    padding: "5% 20%",
  },
});

const Pods = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
	const state = useSelector((state) => state.matricsReducer);
	const [applications, setApplications] = useState([]);

  return (
    <div className={classes.root}>
      <h3>Pods</h3>
      <div>
        <PodsList podList={podData.data} />
      </div>
    </div>
  );
};

export default Pods;
