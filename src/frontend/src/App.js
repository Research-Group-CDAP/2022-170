import PageRoutes from "./PageRoutes";
import { makeStyles } from '@material-ui/core/styles';
import { colors } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
    background:"#0C0C0C",
    color: "#FFFFFF"
  },
});

const App = () => {

  const classes = useStyles();

  return (
    <div className={classes.root}>
     <PageRoutes />
    </div>
  )
}

export default App
