import PageRoutes from "./PageRoutes";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    background: "#404040",
    height: "100%"
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
