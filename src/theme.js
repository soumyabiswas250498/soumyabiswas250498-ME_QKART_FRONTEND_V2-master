import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Lato"
  },
  palette: {
    primary: {
      light: "#00a278",
      main: "#00a278",
      dark: "#00845c",
      contrastText: "#fff",
    },
  },
});

export default theme;
