import PageRoutes from "./PageRoutes";
import AppBar from "./components/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import { colors } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
    background: "#171717",
    color: "#FFFFFF",
  },
});

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar />
    </div>
  );
};

export default App;
