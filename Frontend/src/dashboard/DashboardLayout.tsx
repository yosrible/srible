import React, { useState, useMemo, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  useMediaQuery,
  ThemeProvider,
  Avatar,
  Tooltip,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  BarChart as BarChartIcon,
  Article as ArticleIcon,
  Settings as SettingsIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
  Palette as PaletteIcon,
  Logout as LogoutIcon,
  BugReport as BugReportIcon,
  OpenInNew as OpenInNewIcon,
} from "@mui/icons-material";
import { lightTheme, darkTheme } from "../theme/theme";
import { ThemeToggle } from "../components/ThemeToggle";

const drawerWidth = 240;

const navItems = [
  { label: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
  { label: "Analytics", icon: <BarChartIcon />, path: "/dashboard/analytics" },
  { label: "Posts", icon: <ArticleIcon />, path: "/dashboard/posts" },
  { label: "Themes", icon: <PaletteIcon />, path: "/dashboard/themes" },
  { label: "Settings", icon: <SettingsIcon />, path: "/dashboard/settings" },
];

// Mock user data - in a real app, this would come from your auth context or API
const mockUser = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
};

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [dark, setDark] = useState<boolean>(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark") return true;
    if (stored === "light") return false;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });



  // Persist theme preference whenever it changes
  useEffect(() => {
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  const toggleTheme = React.useCallback(() => {
    setDark(prev => !prev);
  }, []);

  // Memoize the theme to prevent unnecessary recalculations
  const theme = useMemo(() => {
    const selectedTheme = dark ? darkTheme : lightTheme;
    // Force update the body class when theme changes
    document.body.className = `theme-${dark ? 'dark' : 'light'}`;
    document.body.style.backgroundColor = selectedTheme.palette?.background?.default || '';
    document.body.style.color = selectedTheme.palette?.text?.primary || '';
    return selectedTheme;
  }, [dark]);

  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [user] = useState(mockUser); // In a real app, this would come from context

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const drawer = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" noWrap>
          Srible
        </Typography>
      </Toolbar>
      <Divider />
      <List sx={{ flex: 1, overflowY: "auto" }}>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => {
                navigate(item.path);
                setMobileOpen(false);
              }}
            >
              <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Support Links */}
      <Box sx={{ mt: "auto", opacity: 0.7, "&:hover": { opacity: 1 } }}>
        <List dense disablePadding>
          <ListItem disablePadding>
            <ListItemButton
              component="a"
              href="https://discord.gg/Q8y4VAThFm"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                borderRadius: 1,
                color: "text.secondary",
                textDecoration: "none",
                "&:hover": {
                  backgroundColor: "action.hover",
                  color: "primary.main",
                },
                "&.Mui-selected": {
                  backgroundColor: "action.selected",
                  color: "primary.main",
                  "&:hover": {
                    backgroundColor: "action.hover",
                  },
                },
                "& .MuiListItemIcon-root": {
                  color: "inherit",
                },
                "&:active": {
                  backgroundColor: "transparent",
                },
              }}
            >
              <ListItemIcon sx={{ color: "inherit", minWidth: 32 }}>
                <BugReportIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary="Report a Bug"
                primaryTypographyProps={{ variant: "body2" }}
                secondary="Join our Discord"
                secondaryTypographyProps={{
                  variant: "caption",
                  color: "text.secondary",
                  sx: { display: { xs: "none", md: "block" } },
                }}
              />
              <OpenInNewIcon sx={{ fontSize: 16, ml: 1, opacity: 0.7 }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>

      {/* User Profile Section */}
      <Box sx={{ borderTop: 1, borderColor: "divider", p: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar
            sx={{
              width: 36,
              height: 36,
              bgcolor: "primary.main",
              color: "primary.contrastText",
              fontSize: "1rem",
            }}
          >
            {user.firstName[0]}
            {user.lastName[0]}
          </Avatar>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              noWrap
              sx={{ fontWeight: 500, lineHeight: 1.2, fontSize: "0.9rem" }}
            >
              {user.firstName} {user.lastName}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              noWrap
              sx={{ fontSize: "0.75rem" }}
            >
              {user.email}
            </Typography>
          </Box>
          <Tooltip title="Log out">
            <IconButton
              size="small"
              color="inherit"
              onClick={() => console.log("Logout clicked")} // Replace with your logout handler
              sx={{
                color: "text.secondary",
                "&:hover": {
                  color: "error.main",
                  backgroundColor: "rgba(211, 47, 47, 0.08)",
                },
              }}
            >
              <LogoutIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );

  const hideSidebar = location.pathname === "/dashboard/posts/create";

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          minHeight: "100vh",
          bgcolor: "background.default",
          color: "text.primary",
          "& *": {
            transition:
              "background-color 0.3s ease, color 0.2s ease, border-color 0.3s ease, box-shadow 0.3s ease",
          },
          "& img, & svg": {
            transition: "opacity 0.3s ease",
          },
        }}
      >
        <CssBaseline />
        {/* Sidebar */}
        {!hideSidebar && (
          <Box
            component="nav"
            sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
            aria-label="sidebar navigation"
          >
            {/* Mobile Drawer */}
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{ keepMounted: true }}
              sx={{
                display: { xs: "block", md: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
            >
              {drawer}
            </Drawer>
            {/* Desktop Drawer */}
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: "none", md: "block" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
              open
            >
              {drawer}
            </Drawer>
          </Box>
        )}
        {/* Main Area */}
        <Box
          sx={{
            flexGrow: 1,
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Top Bar */}
          <AppBar
            position="sticky"
            color="inherit"
            elevation={0}
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
          >
            <Toolbar sx={{ px: { xs: 1, sm: 3 } }}>
              {!isMdUp && (
                <IconButton
                  color="inherit"
                  aria-label={mobileOpen ? "close drawer" : "open drawer"}
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 3, ml: 1 }}
                >
                  {mobileOpen ? <CloseIcon /> : <MenuIcon />}
                </IconButton>
              )}
              <Box sx={{ flexGrow: 1 }} />
              <ThemeToggle dark={dark} toggleTheme={toggleTheme} />
            </Toolbar>
          </AppBar>
          {/* Main Content */}
          <Box
            sx={{
              flex: 1,
              overflow: "auto",
              p: { xs: 1, sm: 3 },
              width: "100%",
              maxWidth: 1200,
              mx: "auto",
            }}
          >
            {children || <Outlet />}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
