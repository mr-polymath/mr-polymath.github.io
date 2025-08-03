import { createTheme } from "@mui/material/styles";
import type {} from "@mui/lab/themeAugmentation";

// A custom theme for this app
const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: ".mode-%s",
  },
  shape: {
    borderRadius: 2,
  },
  colorSchemes: {
    dark: {
      palette: {
        primary: {
          main: "#ff7900",
        },
        secondary: {
          main: "#ff7900",
        },
      },
    },
    light: {
      palette: {
        primary: {
          main: "#ff7900",
        },
        secondary: {
          main: "#ff7900",
        },
      },
    },
  },
  components: {
    MuiTimelineDot: {
      defaultProps: {
        color: "primary",
      },
    },
    MuiTimelineConnector: {
      defaultProps: {
        color: "#000000",
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 3,
      },
    },
  },
});

export default theme;
