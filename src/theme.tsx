import { createTheme } from "@mui/material/styles";
import type {} from "@mui/lab/themeAugmentation";

// A custom theme for this app
const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: ".mode-%s",
  },
  colorSchemes: {
    dark: {
      palette: {
        primary: {
          main: "#feb062",
        },
        secondary: {
          main: "#feb062",
        },
      },
    },
    light: {
      palette: {
        primary: {
          main: "#feb062",
        },
        secondary: {
          main: "#feb062",
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
