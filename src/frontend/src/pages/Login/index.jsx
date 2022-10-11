import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/auth-store/authActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2% 2%",
  },
  field: {
    margin: "10px",
  },
  TextField: {
    width: "100%",
  },
}));

const UserLogin = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.authReducer);

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const onSubmitLogin = () => {
    const loginData = {
      email,
      password,
    };
    dispatch(loginUser(loginData));
  };

  // If the user login is success
  useEffect(() => {
    let authToken = state.user?.token;
    if (authToken) {
      localStorage.setItem("x-auth-token", authToken);
      window.location.href = "/";
    }
  }, [state.user]);

  return (
    <div className={classes.root}>
      <h3>User Login</h3>
      <br />
      <div>
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
          {" "}
          <Button
            variant="contained"
            color="primary"
            className={classes.TextField}
            onClick={onSubmitLogin}
          >
            Login
          </Button>
        </form>
        { state.user?.token && <Alert severity="success">Login Successful!</Alert>}
        { state.error && !state.error?.msg === "Token is not valid" &&  <Alert severity="error">Something went wrong!</Alert> }
      </div>
    </div>
  );
};

export default UserLogin;
