import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  rootPage: {
    padding: "2% 2%",
  },
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  card: {
    background: "#262626",
    marginTop: theme.spacing(2),
    "&:hover": {
      background: "#6D6D6D",
      cursor: "default",
    },
  },
  labelGreen: {
    color: "#90EE90",
  },
  labelRed: {
    color: "#ed1515",
  },
}));

const UserInformation = (props) => {
  const classes = useStyles();
  const state = useSelector((state) => state.authReducer);

  return (
    <div className={classes.rootPage}>
      <h3>User Information</h3>
      <br />
      <div className={classes.root}>
        <div>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Card className={classes.card}>
                <CardContent>
                  <p>
                    {" "}
                    <Icon
                      icon="ic:outline-supervised-user-circle"
                      width={20}
                    />{" "}
                    Full Name
                  </p>
                  <p>{state.user?.fullName}</p>
                </CardContent>
              </Card>
              <Card className={classes.card}>
                <CardContent>
                  <p>
                    <Icon icon="ic:baseline-email" width={20} /> Email
                  </p>
                  <p>{state.user?.email}</p>
                </CardContent>
              </Card>
              <Card className={classes.card}>
                <CardContent>
                  <p>
                    <Icon
                      icon="ic:baseline-drive-file-rename-outline"
                      width={20}
                    />{" "}
                    azureUserName
                  </p>
                  <p>{state.user?.azureUserName}</p>
                </CardContent>
              </Card>
              <Card className={classes.card}>
                <CardContent>
                  <p>
                    <Icon icon="ic:baseline-password" width={20} />{" "}
                    azurePassword
                  </p>
                  <p>{state.user?.azurePassword}</p>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card className={classes.card}>
                <CardContent>
                  <p>
                    <Icon icon="ic:sharp-group-work" width={20} /> Resource
                    Group
                  </p>
                  <p>{state.user?.resourceGroup}</p>
                </CardContent>
              </Card>
              <Card className={classes.card}>
                <CardContent>
                  <p>
                    <Icon icon="ic:baseline-all-inclusive" width={20} /> Cluster
                    Name
                  </p>
                  <p>{state.user?.clusterName}</p>
                </CardContent>
              </Card>
              <Card className={classes.card}>
                <CardContent>
                  <p>
                    <Icon icon="ic:baseline-grid-3x3" width={20} />{" "}
                    azureSubscriptionId
                  </p>
                  <p>{state.user?.azureSubscriptionId}</p>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default UserInformation;
