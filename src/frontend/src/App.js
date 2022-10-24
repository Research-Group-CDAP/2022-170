import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@material-ui/core";
import { createContext, useMemo, useState, useEffect } from "react";
import AppBar from "./components/AppBar";
import { useDispatch, useSelector } from "react-redux";
import {
  clusterConnected,
  clusterNotConnected,
} from "./store/kube-store/kubeActions";
import axios from "axios";

const ColorModeContext = createContext({ toggleColorMode: () => {} });

const App = () => {
  const [mode, setMode] = useState("dark");
  const dispatch = useDispatch();
  const state = useSelector((state) => state.authReducer);

  useEffect(() => {
    if (localStorage.getItem("clusterConntected")) {
      dispatch(clusterConnected());
    } else {
      dispatch(clusterNotConnected());
    }
  }, []);
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const MINUTE_MS = 60000;

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Logs every minute");
      if (localStorage.getItem("clusterConntected")) {
        //fetch Cpu Usage from prometheus
        axios
          .post(
            `${process.env.REACT_APP_MATRICS_API_ENDPOINT}/prometheus/fetch/fetch_Cpu_Usage/${state.user._id}`
          )
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });

        //fetch Memory Usage from prometheus
        axios
          .post(
            `${process.env.REACT_APP_MATRICS_API_ENDPOINT}/prometheus/fetch/fetch_Memory_Utilization/${state.user._id}`
          )
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });

        //fetch Network Usage from prometheus
        axios
          .post(
            `${process.env.REACT_APP_MATRICS_API_ENDPOINT}/prometheus/fetch/fetch_Network_Utilization/${state.user._id}`
          )
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }, MINUTE_MS);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          type: mode,
          tabs: {
            backgroundColor: "#272525",
            color: "rgba(255, 255, 255, 0.7)",
          },
          mainPage: {
            padding: "2% 2%",
          },
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container>
          <AppBar />
        </Container>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
