import { Box, Typography, Container, Card, CardContent } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import {
  Brush,
  Palette,
  Analytics,
  Publish,
  Security,
  Devices,
} from "@mui/icons-material";

const FeatureCard = styled(Card)(({ theme }) => ({
  height: "100%",
  width: "100%",
  border: "1px solid rgba(0, 0, 0, 0.08)",
  display: "flex",
  flexDirection: "column",
  borderRadius: 12,
  transition: "all 0.2s ease",
  "&:hover": {
    borderColor: theme.palette.primary.light,
    transform: "translateY(-2px)",
    boxShadow: theme.shadows[2],
  },
}));

const FeatureIcon = styled("div")(({ theme }) => ({
  width: 56,
  height: 56,
  borderRadius: 16,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: theme.spacing(3),
  background: theme.palette.primary.light,
  color: theme.palette.primary.contrastText,
  "& svg": {
    fontSize: "1.75rem",
  },
  [theme.breakpoints.down("sm")]: {
    width: 52,
    height: 52,
    "& svg": {
      fontSize: "1.5rem",
    },
  },
}));

const CardContentStyled = styled(CardContent)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  padding: theme.spacing(3),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2.5),
  },
  "& .MuiTypography-cardTitle": {
    marginBottom: theme.spacing(2),
    fontSize: "1.25rem",
    fontWeight: 600,
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.15rem",
    },
  },
  "& .MuiTypography-cardBody": {
    marginTop: "auto",
    paddingTop: theme.spacing(2),
    borderTop: "1px solid rgba(0, 0, 0, 0.06)",
    color: theme.palette.text.secondary,
    lineHeight: 1.6,
  },
}));

const features = [
  {
    title: "Beautiful Writing",
    description:
      "A distraction-free writing environment with markdown support and real-time preview.",
    icon: <Brush />,
  },
  {
    title: "Custom Themes",
    description: "Personalize your writing space with light and dark themes.",
    icon: <Palette />,
  },
  {
    title: "Analytics",
    description: "Track your content's performance with detailed metrics.",
    icon: <Analytics />,
  },
  {
    title: "Instant Publishing",
    description: "Publish and share your content with one click.",
    icon: <Publish />,
  },
  {
    title: "Secure & Private",
    description: "Enterprise-grade security for your content.",
    icon: <Security />,
  },
  {
    title: "Fully Responsive",
    description: "Works on all devices, anywhere, anytime.",
    icon: <Devices />,
  },
];

export const FeaturesSection = () => (
  <Box
    component="section"
    sx={{ py: { xs: 8, md: 12 }, bgcolor: "background.default" }}
  >
    <Container maxWidth="lg" sx={{ px: { xs: 1, md: 4 } }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <Box textAlign="center" mb={8}>
          <Typography
            variant="overline"
            color="primary"
            sx={{
              display: "inline-block",
              mb: 2,
              fontSize: "1rem",
              fontWeight: 600,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            SEE SRIBLE IN ACTION
          </Typography>
          <Typography
            variant="h3"
            align="center"
            sx={{
              mb: 2,
              fontWeight: 700,
              "& span": {
                background: "linear-gradient(90deg, #000 0%, #444 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              },
            }}
          >
            Experience the simplicity and power of our platform
          </Typography>
        </Box>
      </motion.div>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: { xs: 3, sm: 4 },
          justifyItems: "stretch",
          maxWidth: "100%",
        }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 * (index % 3) }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <Box
              sx={{
                display: "flex",
                height: "100%",
                width: "100%",
                maxWidth: "400px",
              }}
            >
              <FeatureCard elevation={0}>
                <CardContentStyled>
                  <Box>
                    <motion.div
                      initial={{ scale: 0.9 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.3,
                        delay: 0.1 * (index % 3) + 0.2,
                      }}
                    >
                      <FeatureIcon>{feature.icon}</FeatureIcon>
                    </motion.div>
                    <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 1 }}>{feature.title}</Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {feature.description}
                  </Typography>
                </CardContentStyled>
              </FeatureCard>
            </Box>
          </motion.div>
        ))}
      </Box>
    </Container>
  </Box>
);
