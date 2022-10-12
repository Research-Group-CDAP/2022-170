import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@material-ui/core";
import { createContext, useMemo, useState, useEffect } from "react";
import AppBar from "./components/AppBar";
import { useDispatch, useSelector } from "react-redux";
import { clusterConnected, clusterNotConnected } from "./store/kube-store/kubeActions";

const ColorModeContext = createContext({ toggleColorMode: () => { } });

const App = () => {
  const [mode, setMode] = useState("dark");
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("clusterConntected")) {
      dispatch(clusterConnected());
    } else {
      dispatch(clusterNotConnected());
    }
  }, [])
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

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
