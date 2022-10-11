import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../store/auth-store/authActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "5% 2%",
  },
  field: {
    margin: "10px",
  },
  TextField: {
    width: "100%",
  },
  title: {
    fontSize: "120px",
    textAlign: "center",
  },
}));

const Registration = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.authReducer);

  const [fullName, setFullName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const onSubmitRegister = () => {
    const registerData = {
      fullName,
      email,
      password,
    };
    dispatch(registerUser(registerData));
  };

  // If the user login is success
  useEffect(() => {
    let authToken = state.user?.token;
    if (authToken) {
      alert("Successfully signed in");
      localStorage.setItem("x-auth-token", authToken);
      window.location.href = "/";
    }
  }, [state.user]);

  return (
    <div className={classes.root}>
      <p className={classes.title}>KubeMate</p>
      <br />
      <div>
        <form className={classes.field} noValidate autoComplete="off">
          <TextField
            id="filled-basic"
            label="Full Name"
            variant="filled"
            className={classes.TextField}
            onChange={(e) => {
              setFullName(e.target.value);
            }}
          />
        </form>
        <form className={classes.field} noValidate autoComplete="off">
          <TextField
            id="filled-basic"
            label="Email"
            variant="filled"
            className={classes.TextField}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </form>
        <form className={classes.field} noValidate autoComplete="off">
          <TextField
            id="filled-basic"
            label="Password"
            variant="filled"
            className={classes.TextField}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </form>
        <form className={classes.field} noValidate autoComplete="off">
          <Button
            variant="contained"
            color="primary"
            onClick={onSubmitRegister}
            className={classes.TextField}
          >
            Register
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
