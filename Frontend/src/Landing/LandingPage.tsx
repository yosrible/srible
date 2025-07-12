import {
  Box,
  Typography,
  Button,
  AppBar,
  Toolbar,
  Container,
  keyframes,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FeaturesSection } from "./FeaturesSection";
import { ContributorsSection } from "./ContributorsSection";
import { PricingSection } from "./PricingSection";
import { FAQSection } from "./FAQSection";
import { Footer } from "./Footer";
import { motion } from "framer-motion";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId.toLowerCase());
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  useMediaQuery(theme.breakpoints.down("md")); // For responsive behavior

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = ["Features", "Pricing", "Team", "FAQ"];

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: scrolled
          ? "rgba(255, 255, 255, 0.6)"
          : "rgba(255, 255, 255, 0.5)",
        backdropFilter: scrolled
          ? "blur(16px) saturate(180%)"
          : "blur(12px) saturate(180%)",
        WebkitBackdropFilter: scrolled
          ? "blur(16px) saturate(180%)"
          : "blur(12px) saturate(180%)",
        color: "#000",
        position: "fixed",
        top: "24px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "1115px",
        maxWidth: "calc(100% - 48px)",
        height: "62px",
        borderRadius: "31px",
        border: "none",
        boxShadow: scrolled
          ? "0 8px 32px rgba(0, 0, 0, 0.05)"
          : "0 4px 16px rgba(0, 0, 0, 0.03)",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        zIndex: 1100,
        "&:before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: "31px",
          background: "transparent",
          pointerEvents: "none",
        },
      }}
      className="navbar"
    >
      <Container maxWidth="lg" sx={{ height: "100%" }}>
        <Toolbar
          disableGutters
          sx={{
            height: "100%",
            justifyContent: "space-between",
            px: 2,
          }}
        >
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              fontFamily: '"Geist", "Geist Fallback", sans-serif',
              fontWeight: 400,
              fontSize: "1.25rem",
              letterSpacing: "0.5px",
              textDecoration: "none",
              color: "#000000",
              textTransform: "none",
              fontVariant: "normal",
              "&:hover": {
                color: "#000000 !important",
                opacity: 1,
              },
              display: "flex",
              alignItems: "center",
              height: "100%",
              mr: { md: "auto" },
            }}
          >
            Srible
          </Typography>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 4,
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            {navItems.map((item) => (
              <Button
                key={item}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.toLowerCase());
                }}
                sx={{
                  color: "text.primary",
                  textTransform: "none",
                  fontSize: "0.95rem",
                  fontWeight: 400,
                  px: 1,
                  minWidth: "auto",
                  "&:focus": {
                    outline: "none",
                    boxShadow: "none",
                  },
                  "&:active": {
                    boxShadow: "none",
                  },
                  "&:hover": {
                    color: "primary.main",
                    backgroundColor: "transparent",
                  },
                }}
                disableRipple
              >
                {item}
              </Button>
            ))}
          </Box>

          {/* Auth buttons - always visible */}
          <Box
            sx={{ display: "flex", alignItems: "center", ml: "auto", gap: 1 }}
          >
            <Button
              component={Link}
              to="/signin"
              variant="outlined"
              color="inherit"
              size="small"
              sx={{
                fontFamily: '"Geist", "Geist Fallback", sans-serif',
                textTransform: "none",
                fontWeight: 400,
                fontSize: { xs: "0.8rem", sm: "0.9rem" },
                px: { xs: 1.5, sm: 2 },
                height: { xs: "32px", sm: "36px" },
                borderRadius: "50px",
                border: "1px solid",
                borderColor: "rgba(0, 0, 0, 0.1)",
                backgroundColor: "transparent",
                color: "text.primary",
                minWidth: "auto",
                whiteSpace: "nowrap",
                "&:hover, &:active, &:focus, &.Mui-focusVisible": {
                  borderColor: "rgba(0, 0, 0, 0.1)",
                  backgroundColor: "transparent",
                  color: "text.primary",
                },
                "& .MuiButton-label": {
                  color: "text.primary",
                },
                "&:hover .MuiButton-label, &:active .MuiButton-label, &:focus .MuiButton-label":
                  {
                    color: "text.primary",
                  },
                transition: "none",
              }}
            >
              Sign in
            </Button>
            <Button
              component={Link}
              to="/signup"
              variant="contained"
              color="primary"
              size="small"
              sx={{
                fontFamily: '"Geist", "Geist Fallback", sans-serif',
                textTransform: "none",
                fontWeight: 400,
                fontSize: { xs: "0.8rem", sm: "0.9rem" },
                boxShadow: "none",
                borderRadius: "18px",
                px: { xs: 1.5, sm: 2 },
                height: { xs: "32px", sm: "36px" },
                minWidth: "auto",
                whiteSpace: "nowrap",
                backgroundColor: "primary.main",
                color: "white", // Force white text color
                "&:hover, &:active, &:focus, &.Mui-focusVisible": {
                  backgroundColor: "primary.main",
                  color: "white", // Keep white text on all states
                  boxShadow: "none",
                  transform: "none",
                },
                "& .MuiButton-label": {
                  color: "white", // Target the label directly
                },
                "&:hover .MuiButton-label, &:active .MuiButton-label, &:focus .MuiButton-label":
                  {
                    color: "white", // Ensure label stays white
                  },
                transition: "none",
              }}
              disableRipple
            >
              Get Started
            </Button>

            {/* Mobile menu button */}
            <Box
              sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}
            >
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerToggle}
                sx={{ ml: 1 }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 280,
            pt: 2,
            right: 0,
            left: "auto",
            "& .close-button-container": {
              display: "flex",
              justifyContent: "flex-end",
              pr: 5,
              pt: 2,
            },
          },
        }}
      >
        <Box className="close-button-container">
          <IconButton
            onClick={handleDrawerToggle}
            size="small"
            sx={{
              color: "text.secondary",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <List sx={{ pt: 1 }}>
          {navItems.map((item) => (
            <ListItem key={item} disablePadding>
              <ListItemButton
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.toLowerCase());
                  setMobileOpen(false);
                }}
                sx={{
                  textAlign: "center",
                  px: 2,
                  py: 1.5,
                  color: "text.primary",
                  "&:focus": {
                    outline: "none",
                    boxShadow: "none",
                  },
                  "&:active": {
                    boxShadow: "none",
                  },
                  "&:hover": {
                    color: "primary.main",
                    backgroundColor: "transparent",
                  },
                }}
              >
                <ListItemText
                  primary={item}
                  primaryTypographyProps={{
                    fontFamily: '"Geist", "Geist Fallback", sans-serif',
                    fontWeight: 400,
                    fontSize: "0.95rem",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
};

const LandingPage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "white",
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Navbar />
      <Box
        component="main"
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Hero Section with Animated Grid Pattern */}
        <Box
          sx={{
            width: "100%",
            minHeight: "100vh",
            position: "relative",
            overflow: "hidden",
            background: "white",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: [
                "linear-gradient(to right, rgba(0, 0, 0, 0.1) 1px, transparent 1px)",
                "linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 1px, transparent 1px)",
                "radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.15) 1px, transparent 0)",
              ].join(","),
              backgroundSize: "60px 60px, 60px 60px, 20px 20px",
              zIndex: 0,
              animation: "gridMove 40s linear infinite",
              "@keyframes gridMove": {
                "0%": {
                  backgroundPosition: "0 0, 0 0, 0 0",
                },
                "100%": {
                  backgroundPosition: "60px 60px, 60px 60px, 20px 20px",
                },
              },
            },
            "&::after": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "radial-gradient(circle at 50% 50%, rgba(255,255,255,0) 0%, rgba(255,255,255,0.94) 100%)",
              zIndex: 1,
              pointerEvents: "none",
            },
          }}
        >
          <Container
            maxWidth="lg"
            sx={{
              position: "relative",
              zIndex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "100vh",
              px: 2,
              boxSizing: "border-box",
              textAlign: "center",
              pt: "80px",
              pb: 10,
              animation: `${fadeIn} 0.8s ease-out forwards`,
              maxWidth: "1200px",
              mx: "auto",
              width: "100%",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Button
                variant="contained"
                size="small"
                href="https://github.com/yosrible/srible"
                target="_blank"
                rel="noopener noreferrer"
                startIcon={
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.386-1.332-1.755-1.332-1.755-1.089-.745.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.652.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.573C20.566 21.795 24 17.295 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                }
                sx={{
                  mb: 3,
                  backgroundColor: "#000",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#1a1a1a",
                  },
                  textTransform: "none",
                  fontWeight: 400,
                  borderRadius: "20px",
                  px: 2,
                  py: 0.5,
                  fontSize: "0.8rem",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                  transition: "all 0.2s ease",
                }}
              >
                Open Source
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            >
              <Typography
                component="h1"
                sx={{
                  fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4rem" },
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                  mb: 3,
                  color: "#000",
                }}
              >
                Write Freely, Share Beautifully
              </Typography>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            >
              <Typography
                component="h2"
                sx={{
                  fontSize: { xs: "1rem", sm: "1.25rem" },
                  fontWeight: 400,
                  color: "#666",
                  lineHeight: 1.7,
                  maxWidth: "520px",
                  mx: "auto",
                  mb: 5,
                  px: { xs: 2, sm: 0 },
                  textAlign: 'center',
                }}
              >
                A minimal blogging platform that stays out of your way. Focus on
                your words, we'll handle the rest.
              </Typography>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.99 }}
            >
              <Button
                variant="contained"
                size="large"
                component={Link}
                to="/signup"
                endIcon={
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 12H19M19 12L12 5M19 12L12 19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
                sx={{
                  background: "#000",
                  color: "#fff",
                  borderRadius: "50px",
                  px: 5,
                  py: 1.8,
                  textTransform: "none",
                  fontSize: "1.1rem",
                  fontFamily: 'sans-serif',
                  fontWeight: 400,
                  letterSpacing: "0.5px",
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                  position: "relative",
                  overflow: "visible",
                  transition:
                    "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                  transform: "translateZ(0)",
                  willChange: "transform",
                  "&:hover": {
                    transform: "translateY(-4px) scale(1.03)",
                    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
                    background: "#fff",
                    "& .MuiButton-label": {
                      background: "linear-gradient(90deg, #000 0%, #333 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    },
                  },
                  "&:active": {
                    transform: "translateY(-1px) scale(0.99)",
                    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                  },
                }}
              >
                Create a blog
              </Button>
            </motion.div>
          </Container>
        </Box>
        {/* Features Section */}
        <Box id="features" component="section" sx={{ width: "100%" }}>
          <FeaturesSection />
        </Box>

        {/* Contributors Section */}
        <ContributorsSection />

        {/* Pricing Section */}
        <Box id="pricing" component="section" sx={{ width: "100%" }}>
          <PricingSection />
        </Box>

        {/* FAQ Section */}
        <Box id="faq" component="section" sx={{ width: "100%" }}>
          <FAQSection />
        </Box>

        {/* CTA Section */}
        <Box
          sx={{
            width: "100%",
            py: 12,
            px: 2,
            bgcolor: "#000",
            position: "relative",
            overflow: "hidden",
            textAlign: "center",
            backgroundImage: [
              "linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
              "linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
            ].join(","),
            backgroundSize: "40px 40px",
            "&:before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "radial-gradient(circle at 20% 30%, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.95) 100%)",
              zIndex: 0,
            },
            "&:after": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: [
                "radial-gradient(ellipse at center, rgba(0,0,0,0.2) 0%, transparent 70%)",
                "linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
                "linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
              ].join(","),
              backgroundSize: "100% 100%, 40px 40px, 40px 40px",
              zIndex: 1,
              pointerEvents: "none",
            },
          }}
        >
          <Container
            maxWidth="md"
            sx={{
              textAlign: "center",
              position: "relative",
              zIndex: 2,
            }}
          >
            <Typography
              variant="h3"
              sx={{
                mb: 3,
                fontWeight: 700,
                color: "#fff",
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              }}
            >
              Ready to start writing?
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mb: 4,
                maxWidth: "600px",
                mx: "auto",
                color: "rgba(255, 255, 255, 0.9)",
                fontSize: { xs: "1rem", sm: "1.25rem" },
                lineHeight: 1.6,
              }}
            >
              Create your free account and start publishing your stories in
              seconds. No credit card required.
            </Typography>
            <Button
              component={Link}
              to="/signup"
              variant="contained"
              size="large"
              sx={{
                background: "#fff",
                color: "#000",
                borderRadius: "50px",
                px: 5,
                py: 1.8,
                textTransform: "none",
                fontSize: "1.1rem",
                fontWeight: 600,
                letterSpacing: "0.5px",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                position: "relative",
                overflow: "visible",
                transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                transform: "translateZ(0)",
                willChange: "transform",
                "&:hover": {
                  transform: "translateY(-4px) scale(1.03)",
                  boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
                  color: "#000",
                  "& .MuiButton-label": {
                    background: "linear-gradient(90deg, #000 0%, #333 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  },
                },
                "&:active": {
                  transform: "translateY(-1px) scale(0.99)",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              Start Writing Now — It's Free
            </Button>
          </Container>
        </Box>
        {/* Footer */}
        <Footer />
      </Box>
    </Box>
  );
};

export default LandingPage;
