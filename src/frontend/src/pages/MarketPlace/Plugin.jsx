import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { makeStyles } from "@material-ui/styles";
import { Card, CardContent, Divider, Typography } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getUserDetails } from "../../store/auth-store/authActions";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "100%",
  },
}));

const Plugin = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.authReducer);
  const [checked, setChecked] = useState(props.plugin.active);

  useEffect(() => {
    const arr = state.user?.plugins.filter(
      (e) => e === props.plugin.pluginName
    );
    if (arr.length) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, []);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    let updatePlugin = {
      Id: state.user?._id,
      plugin: props.plugin.pluginName,
      type: "ADD",
    };;

    if(event.target.checked){
       updatePlugin.type = "ADD"
    }else{
       updatePlugin.type = "REMOVE"
    }

    axios.put("http://localhost:5500/user/updateplugins",updatePlugin).then(()=>{
      dispatch(getUserDetails());
    }).catch(()=>{

    });
  };

  return (
    <>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography
            sx={{ fontSize: 14 }}
            color="text.secondary"
            variant="subtitle1"
            gutterBottom
          >
            <Icon
              icon={props.plugin.icon}
              width={20}
              style={{ marginRight: 8 }}
            />
            {props.plugin.pluginName}
          </Typography>
          <Divider style={{ marginBottom: 10, marginTop: 0 }} />
          <Typography
            sx={{ fontSize: 14 }}
            color="text.secondary"
            variant="subtitle1"
            gutterBottom
          >
            {props.plugin.description}
          </Typography>
          <br />

          <Switch
            checked={checked}
            onChange={handleChange}
            color="primary"
            name="checkedB"
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default Plugin;
