import React from "react";
// Toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// routes
import Router from "./routes/routes";
// theme
import { ThemeProvider } from "@mui/material/styles";
import theme from "assets/theme";
// ChartJS initialization
// eslint-disable-next-line no-unused-vars
import ChartsInit from "components/Charts/ChartsInit";
// Flatpickr initialization
import flatpickr from "flatpickr";
import locale from "flatpickr/dist/l10n/es.js";

flatpickr.localize(locale.es);
// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router />
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar
        theme="colored"
        pauseOnFocusLoss={false}
      />
    </ThemeProvider>
  );
}
