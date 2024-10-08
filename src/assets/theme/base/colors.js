/**
=========================================================
* Material Kit 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/**
 * The base colors for the Material Kit 2 React.
 * You can add new color using this file.
 * You can customized the colors for the entire Material Kit 2 React using thie file.
 */
import { darken, lighten } from "assets/theme/functions/colorUtils";
export default {
  background: {
    default: "#f0f2f5",
  },

  text: {
    main: "#0C2D48",
    focus: "#061623",
  },

  primary: {
    main: "#58508d",
    focus: "#494276",
  },

  secondary: {
    main: "#33C1A5",
    focus: "#2BA189",
  },

  info: {
    main: "#2F97C1",
    focus: "#2881A4",
  },

  success: {
    main: "#0CAD21",
    focus: "#67bb6a",
  },

  warning: {
    main: "#F39237",
    focus: "#F28118",
  },

  error: {
    main: "#F61A13", // "#CF1341", #BC2C1A
    focus: "#D90F08",
  },
  // Aux colors (used by MK components)
  transparent: {
    main: "transparent",
  },

  white: {
    main: "#ffffff",
    focus: "#ffffff",
  },

  black: {
    light: "#121212",
    main: "#000000",
  },

  light: {
    main: "#f0f2f5",
    darker: "#E7EAEF",
    darker2: "#DADFE7",
  },

  dark: {
    main: "#0C2D48", // "#124269",
    focus: "#061623",
  },

  grey: {
    100: "#f8f9fa",
    200: "#f0f2f5",
    300: "#dee2e6",
    400: "#ced4da",
    500: "#adb5bd",
    600: "#6c757d",
    700: "#495057",
    800: "#343a40",
    900: "#212529",
  },

  gradients: {
    primary: {
      main: "#786FAE",
      state: "#4A4276",
    },

    secondary: {
      main: "#747b8a",
      state: "#495361",
    },

    info: {
      main: "#49a3f1",
      state: "#1A73E8",
    },

    success: {
      main: "#66BB6A",
      state: "#43A047",
    },

    warning: {
      main: "#FFA726",
      state: "#FB8C00",
    },

    error: {
      main: "#EF5350",
      state: "#E53935",
    },

    light: {
      main: "#EBEFF4",
      state: "#CED4DA",
    },

    dark: {
      main: "#42424a",
      state: "#191919",
    },
  },

  socialMediaColors: {
    facebook: {
      main: "#3b5998",
      dark: "#344e86",
    },

    twitter: {
      main: "#55acee",
      dark: "#3ea1ec",
    },

    instagram: {
      main: "#125688",
      dark: "#0e456d",
    },

    linkedin: {
      main: "#0077b5",
      dark: "#00669c",
    },

    pinterest: {
      main: "#cc2127",
      dark: "#b21d22",
    },

    youtube: {
      main: "#e52d27",
      dark: "#d41f1a",
    },

    vimeo: {
      main: "#1ab7ea",
      dark: "#13a3d2",
    },

    slack: {
      main: "#3aaf85",
      dark: "#329874",
    },

    dribbble: {
      main: "#ea4c89",
      dark: "#e73177",
    },

    github: {
      main: "#24292e",
      dark: "#171a1d",
    },

    reddit: {
      main: "#ff4500",
      dark: "#e03d00",
    },

    tumblr: {
      main: "#35465c",
      dark: "#2a3749",
    },
  },

  badgeColors: {
    primary: {
      background: "#C5BEF7",
      text: "#494276",
    },

    secondary: {
      background: "#74FFD9",
      text: "#1E6E5E",
    },

    info: {
      background: "#aecef7",
      text: "#095bc6",
    },

    success: {
      background: "#bce2be",
      text: "#339537",
    },

    warning: {
      background: "#ffd59f",
      text: "#c87000",
    },

    error: {
      background: "#fcd3d0",
      text: "#f61200",
    },

    light: {
      background: "#ffffff",
      text: "#c7d3de",
    },

    dark: {
      background: "#8097bf",
      text: "#1e2e4a",
    },
  },

  coloredShadows: {
    primary: "#58508c",
    secondary: "#33C1A4",
    info: "#00bbd4",
    success: "#4caf4f",
    warning: "#ff9900",
    error: "#f44336",
    light: "#adb5bd",
    dark: "#404040",
  },

  inputBorderColor: "#d2d6da",

  tabs: {
    indicator: { boxShadow: "#ddd" },
  },

  pieChart: {
    backgroundColors: [
      "#4caf50",
      "#673ab7",
      "#ff9800",
      "#2196f3",
      "#9c27b0",
      "#009688",
      "#f44336",
      "#ffeb3b",
      "#ff5722",
      "#795548",
      "#607d8b",
    ],
  },
};
