import { Container,makeStyles,Grid,Typography,Paper,Box,TextField,Button } from '@material-ui/core';
import React from "react";
  
const useStyles = makeStyles({
  container: {
    background: "#2C2F33",
    padding:"0"
  },
  boxT:{
    backgroundColor: "#3B3C40",
    paddingTop:"20px",
    paddingBottom:"20px"
  },
  boxM:{
    backgroundColor: "#333439",
    paddingTop:"20px",
    paddingLeft:"20px",
    paddingRight:"20px",
    paddingBottom:"20px",
    textAlign: "left"

  },
  para:{
    fontSize:"8px"
  }
});

const RegistrationArea = (props) => {
  const classes = useStyles();
    return (
      <div>
        <Grid container spacing={1} className={classes.container}>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Box className={classes.boxT}>
            <h4>Lens ID</h4>
            <Typography className={classes.para}>Login with your lens ID and unlock a bunch of features to continue wirking with your project</Typography>
          </Box>
          <Box className={classes.boxM}>
            <p>Hello</p>
            <TextField id="outlined-basic" fullWidth label="Outlined"  variant="outlined" />
            <p>Hello</p>
            <TextField id="outlined-basic" fullWidth label="Outlined"  variant="outlined" />
            <Button variant="outlined" color="success">Outlined</Button>

          </Box> 
          <Box className={classes.boxT}>
            <Typography className={classes.para}>Copyrights reservced</Typography>
          </Box>
        </Grid>
      </Grid>
      </div>
    );
  };
  
  export default RegistrationArea;