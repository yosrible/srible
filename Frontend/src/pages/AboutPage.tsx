import {
  Box,
  Typography,
  Container,
  Paper,
  Button,
  Card,
  CardContent,
  styled,
} from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle, Star, Chat } from "@mui/icons-material";
import { Theme } from "@mui/material/styles";

// Define proper type for theme in styled components
type StyledProps = {
  theme?: Theme;
};

const StyledCard = styled(Card)<StyledProps>(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  borderRadius: 16,
  boxShadow: theme.shadows[2],
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: theme.shadows[8],
  },
}));

const ValueCard = styled(Paper)<StyledProps>(({ theme }) => ({
  padding: theme.spacing(4),
  height: "100%",
  borderRadius: 16,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: theme.shadows[8],
  },
}));

const ValueIcon = styled(Box)<StyledProps>(({ theme }) => ({
  width: 64,
  height: 64,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: theme.spacing(3),
  color: "white",
  "& .MuiSvgIcon-root": {
    fontSize: "2rem",
  },
}));

export const AboutPage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        pt: { xs: 4, md: 8 },
        pb: 8,
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 800,
              mb: 4,
              textAlign: "center",
              fontSize: { xs: "2.5rem", md: "3.5rem" },
              lineHeight: 1.2,
            }}
          >
            About Srible
          </Typography>

          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 6 },
              mb: 6,
              borderRadius: 4,
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: 4,
                mb: 6,
              }}
            >
              <Box>
                <StyledCard>
                  <CardContent sx={{ flexGrow: 1, p: 4 }}>
                    <Typography
                      variant="h4"
                      component="h2"
                      sx={{ fontWeight: 700, mb: 3, color: "primary.main" }}
                    >
                      Our Mission
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: "1.1rem",
                        lineHeight: 1.8,
                        color: "text.secondary",
                      }}
                    >
                      At Srible, we believe in making content creation simple,
                      beautiful, and accessible to everyone. Our platform is
                      designed to help writers and creators focus on what
                      matters most - their content - while we handle the rest
                      with our intuitive tools and clean design.
                    </Typography>
                  </CardContent>
                </StyledCard>
              </Box>
              <Box>
                <StyledCard>
                  <CardContent sx={{ flexGrow: 1, p: 4 }}>
                    <Typography
                      variant="h4"
                      component="h2"
                      sx={{ fontWeight: 700, mb: 3, color: "primary.main" }}
                    >
                      Our Story
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: "1.1rem",
                        lineHeight: 1.8,
                        color: "text.secondary",
                      }}
                    >
                      Founded in 2025, Srible was born out of a simple idea: to
                      create a writing platform that removes all distractions
                      and lets your words take center stage. Our team of
                      passionate developers and designers came together to build
                      a tool that we ourselves would love to use every day.
                    </Typography>
                  </CardContent>
                </StyledCard>
              </Box>
            </Box>

            <Typography
              variant="h3"
              component="h2"
              sx={{ fontWeight: 700, mb: 6, textAlign: "center" }}
            >
              Our Core Values
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" },
                gap: 4,
                mb: 8,
              }}
            >
              <Box>
                <ValueCard elevation={2}>
                  <ValueIcon sx={{ bgcolor: "#48BB78" }}>
                    <CheckCircle />
                  </ValueIcon>
                  <Typography
                    variant="h5"
                    component="h3"
                    sx={{ fontWeight: 700, mb: 2 }}
                  >
                    Simplicity
                  </Typography>
                  <Typography color="text.secondary">
                    We believe in creating tools that are intuitive and easy to
                    use, removing unnecessary complexity.
                  </Typography>
                </ValueCard>
              </Box>
              <Box>
                <ValueCard elevation={2}>
                  <ValueIcon sx={{ bgcolor: "#4299E1" }}>
                    <Star />
                  </ValueIcon>
                  <Typography
                    variant="h5"
                    component="h3"
                    sx={{ fontWeight: 700, mb: 2 }}
                  >
                    Design Excellence
                  </Typography>
                  <Typography color="text.secondary">
                    We're committed to creating beautiful, functional interfaces
                    that enhance the writing experience.
                  </Typography>
                </ValueCard>
              </Box>
              <Box>
                <ValueCard elevation={2}>
                  <ValueIcon sx={{ bgcolor: "#9F7AEA" }}>
                    <Chat />
                  </ValueIcon>
                  <Typography
                    variant="h5"
                    component="h3"
                    sx={{ fontWeight: 700, mb: 2 }}
                  >
                    Community Focus
                  </Typography>
                  <Typography color="text.secondary">
                    We build with our community in mind, creating tools that
                    bring writers and readers together.
                  </Typography>
                </ValueCard>
              </Box>
            </Box>
          </Paper>

          <Box sx={{ textAlign: "center", mt: 8, mb: 4 }}>
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 700,
                mb: 4,
                fontSize: { xs: "1.8rem", md: "2.5rem" },
              }}
            >
              Ready to start writing?
            </Typography>
            <Button
              component={Link}
              to="/signup"
              variant="contained"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: "50px",
                fontSize: "1.1rem",
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              Get Started for Free
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default AboutPage;
