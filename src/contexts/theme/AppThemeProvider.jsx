import { ThemeProvider, createTheme } from '@mui/material/styles';
import React from "react";

const myTheme = createTheme({
   palette: {
      mode: 'light',
   },
});

const AppThemeProvider = ({ children }) => {
   return <ThemeProvider theme={myTheme}>{children}</ThemeProvider>;
};

export default AppThemeProvider;
