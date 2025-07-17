import { createTheme, ThemeOptions } from "@mui/material/styles";

// Base configuration for both themes
const baseTheme: ThemeOptions = {
  components: {
    MuiCssBaseline: {
      styleOverrides: (theme: any) => ({
        '*, *::before, *::after, body, img, svg, button, a, [role="button"], [tabindex="0"]': {
          transition: 'none !important',
          animation: 'none !important',
        },
        body: {
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
          transition: 'none !important',
        },
      }),
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
        disableTouchRipple: true,
      },
    },
  },
  transitions: {
    // Disable all transitions
    create: () => 'none',
  },
};

// Light theme
export const lightTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: "light",
    primary: {
      main: "#1a1a1a",
    },
    secondary: {
      main: "#666666",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "8px",
          fontWeight: 500,
          padding: "8px 24px",
        },
        containedPrimary: {
          backgroundColor: "#1a1a1a",
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "#333333",
          },
        },
      },
    },
  },
});

// Dark theme
export const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#f48fb1",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "8px",
          fontWeight: 500,
          padding: "8px 24px",
        },
      },
    },
  },
});

// Export the theme type
export type AppTheme = typeof lightTheme;
