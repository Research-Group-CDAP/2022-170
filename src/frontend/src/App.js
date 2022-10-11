import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@material-ui/core";
import { createContext, useMemo, useState } from "react";
import AppBar from "./components/AppBar";

const ColorModeContext = createContext({ toggleColorMode: () => {} });

const App = () => {
  const [mode, setMode] = useState("dark");
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
