import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import MemoryIcon from "@material-ui/icons/Memory";
import NetworkWifiIcon from "@material-ui/icons/NetworkWifi";
import ComputerIcon from "@material-ui/icons/Computer";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Cpu from "../Cpu";
import Memory from "../Memory";
import Network from "../Network";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: "#272525",
  },
  tabs: {
    color: "#ffffff",
    backgroundColor: "#272525",
    borderBottom: '1px solid #e8e8e8',
  },
}));

const SlideDrawer = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static" color="black">
        <Tabs
          value={value}
          onChange={handleChange}
          className={classes.tabs}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="white"
          textColor="white"
          aria-label="scrollable force tabs"
          centered
        >
          <Tab label="CPU" icon={<ComputerIcon />} {...a11yProps(0)} />
          <Tab label="MEMORY" icon={<MemoryIcon />} {...a11yProps(1)} />
          <Tab label="NETWORK" icon={<NetworkWifiIcon />} {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Cpu />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Memory />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Network />
      </TabPanel>
    </div>
  );
};

export default SlideDrawer;
