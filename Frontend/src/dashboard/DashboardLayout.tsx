import React, { useState } from "react";
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
  useTheme,
  useMediaQuery,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  BarChart as BarChartIcon,
  Article as ArticleIcon,
  Settings as SettingsIcon,
  Menu as MenuIcon,
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
  Palette as PaletteIcon,
} from "@mui/icons-material";

const drawerWidth = 240;

const navItems = [
  { label: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
  { label: "Analytics", icon: <BarChartIcon />, path: "/dashboard/analytics" },
  { label: "Posts", icon: <ArticleIcon />, path: "/dashboard/posts" },
  { label: "Themes", icon: <PaletteIcon />, path: "/dashboard/themes" },
  { label: "Settings", icon: <SettingsIcon />, path: "/dashboard/settings" },
];

export default function DashboardLayout() {
  const [dark, setDark] = useState(false);
  const theme = React.useMemo(() => createTheme({ palette: { mode: dark ? "dark" : "light" } }), [dark]);
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const drawer = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6" noWrap>
          Srible
        </Typography>
        {/* Theme toggle stays in sidebar for desktop only */}
        <IconButton color="inherit" onClick={() => setDark((d) => !d)} aria-label="toggle theme" sx={{ display: { xs: 'none', md: 'inline-flex' } }}>
          {dark ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
      <Divider />
      <List>
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
      {/* Theme toggle for mobile: below settings, centered */}
      <Box sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'center', mt: 2 }}>
        <IconButton color="inherit" onClick={() => setDark((d) => !d)} aria-label="toggle theme">
          {dark ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Box>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "background.default",
        color: "text.primary",
        transition: 'background-color 0.4s cubic-bezier(0.4,0,0.2,1), color 0.4s cubic-bezier(0.4,0,0.2,1)',
      }}>
        <CssBaseline />
        {/* Sidebar */}
        <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }} aria-label="sidebar navigation">
          {/* Mobile Drawer */}
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: "block", md: "none" },
              "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
          {/* Desktop Drawer */}
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", md: "block" },
              "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        {/* Main Area */}
        <Box sx={{ flexGrow: 1, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
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
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2 }}
                >
                  <MenuIcon />
                </IconButton>
              )}
              <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }} />
              {/* Removed theme toggle from AppBar */}
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
            <Outlet />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
} 