import { createTheme } from "@mui/material/styles";

//? NOTE Create Custom Theme
export const lightTheme = createTheme({
  direction: "rtl",
  palette: {
    mode: "light",
    primary: {
      main: "#8be9fd",
    },
    secondary: {
      main: "#df2343",
    },
    redAccent: {
      main: "#df2343",
    },
    greenAccent: {
      main: "#43cf21",
      light: "#43ff21",
      dark: "#439921",
    },
  },
  typography: {
    fontFamily: "vazir , roboto",
  },
});

export const darkTheme = createTheme({
  direction: "rtl",
  palette: {
    mode: "dark",
    primary: {
      main: "#8be9fd",
    },
    secondary: {
      main: "#bd93f9",
    },
    redAccent: {
      main: "#df2343",
    },
    greenAccent: {
      main: "#43cf21",
      light: "#43ff21",
      dark: "#439921",
    },
  },
  typography: {
    fontFamily: "vazir , roboto",
  },
});
