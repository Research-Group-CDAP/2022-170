import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Image from "../../assetes/images/welcomeimage.avif";
import ImageWeb from "../../assetes/images/webss.png";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    textAlign: "center",
    padding: "4% 0%",
    fontSize: "70px",
  },
  home: {
    height: "100vh",
    paddingTop: "15%",
  },
  heading: {
    fontSize: "50px",
    textAlign: "left",
  },
  textPara: {
    fontSize: "20px",
    textAlign: "left",
  },
  rootServices: {
    textAlign: "center",
    fontSize: "15px",
  },
  Card:{
    minHeight:"250px"
  }
});

const Home = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.home}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <div className={classes.heading}>
              <p>KubeMate | The way the world runs Kubernetes</p>
            </div>
            <div className={classes.textPara}>
              <p>
                Kubernetes is the OS for the cloud. Thousands of businesses and
                people develop and operate their Kubernetes on Lens — The
                largest and most advanced Kubernetes platform in the world.
              </p>
            </div>
          </Grid>
          <Grid item xs={6}>
            <img src={Image} width="400px" height="400px" alt={Image} />
          </Grid>
        </Grid>
      </div>
      <div className={classes.rootServices}>
        <Grid container spacing={3}>
          <h3 textAlign="center">
            The largest and most advanced Kubernetes platform in the world
          </h3>
          <Grid item xs={4}>
            <Card className={classes.Card}>
              <CardContent>
                <h5> Kubernetes for Everyone</h5>
                <Divider />
                <br />
                Lens is built on open source with a vibrant community and is
                backed by a number of Kubernetes and cloud native ecosystem
                pioneers.
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card className={classes.Card}>
              <CardContent>
                <h5>  Pro Features </h5>
                <Divider />
                <br />
                Lens Desktop works with any Kubernetes. It removes complexity
                and increases productivity. It’s used by everyone — from devs to
                ops and startups to large companies.
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card className={classes.Card}>
              <CardContent>
                <h5> Built on Open Source </h5>
                <Divider />
                <br />
                Expand the core functionality of Lens Desktop with Desktop
                Kubernetes, Teamwork, Security and Commercial Support for
                increased productivity and time to value.
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <img src={ImageWeb} height="450px" alt={Image} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Home;
