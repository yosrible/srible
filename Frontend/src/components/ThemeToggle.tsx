import React, { memo } from "react";
import { IconButton, Tooltip } from "@mui/material";
import { DarkMode as DarkModeIcon, LightMode as LightModeIcon } from "@mui/icons-material";

interface ThemeToggleProps {
  dark: boolean;
  toggleTheme: () => void;
}

const ThemeToggleComponent: React.FC<ThemeToggleProps> = ({ dark, toggleTheme }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleTheme();
  };

  return (
    <Tooltip title={dark ? "Switch to light mode" : "Switch to dark mode"}>
      <IconButton
        onClick={handleClick}
        color="inherit"
        aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
        disableRipple
        disableTouchRipple
        disableFocusRipple
        sx={{
          '&:hover': {
            backgroundColor: 'transparent !important',
          },
        }}
      >
        {dark ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </Tooltip>
  );
};

export const ThemeToggle = memo(ThemeToggleComponent);
