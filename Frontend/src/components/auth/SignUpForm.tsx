import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  Paper,
  Container,
  Stack,
  InputAdornment,
  IconButton,
  Divider,
  useTheme,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import GoogleLogo from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import AppleIcon from "@mui/icons-material/Apple";

interface SignUpFormProps {
  className?: string;
}

export function SignUpForm({ className }: SignUpFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // TODO: Replace with actual signup API call
      console.log("Signing up with:", { email, password });
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      // Redirect to onboarding after successful signup
      navigate("/onboarding");
    } catch (error) {
      console.error("Signup failed:", error);
      // TODO: Show error message to user
    }
  };

  return (
    <Container component="div" maxWidth="md" className={className}>
      <Paper
        sx={{
          overflow: "hidden",
          boxShadow: theme.shadows[3],
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          borderRadius: 3,
          minHeight: '600px', // Set a fixed minimum height
          '&:hover': {
            boxShadow: theme.shadows[6],
          },
          transition: 'all 0.3s ease-in-out',
        }}
      >
        <Box sx={{ 
          p: { xs: 3, md: 6 },
          '& .MuiButton-root': {
            borderRadius: 2,
          },
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
          }
        }}>
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            Create an account
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ mb: 4 }}
          >
            Join Srible and get started
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
              <Button
                variant="outlined"
                size="small"
                startIcon={<GoogleLogo />}
                fullWidth
                sx={{
                  borderRadius: "4px",
                  textTransform: "none",
                  py: 1,
                }}
              >
                Google
              </Button>
              <Button
                variant="outlined"
                size="small"
                startIcon={<GitHubIcon />}
                fullWidth
                sx={{
                  borderRadius: "4px",
                  textTransform: "none",
                  py: 1,
                }}
              >
                GitHub
              </Button>
              <Button
                variant="outlined"
                size="small"
                startIcon={<AppleIcon />}
                fullWidth
                sx={{
                  borderRadius: "4px",
                  textTransform: "none",
                  py: 1,
                  display: { xs: "none", sm: "flex" },
                }}
              >
                Apple
              </Button>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
              <Divider sx={{ flexGrow: 1 }} />
              <Typography
                variant="body2"
                sx={{ px: 2, color: "text.secondary" }}
                component="span"
              >
                OR
              </Typography>
              <Divider sx={{ flexGrow: 1 }} />
            </Box>

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              size="small"
              sx={{ mb: 2 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      size="small"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 1 }}
            >
              Sign Up
            </Button>
            <Stack direction="row" justifyContent="center" spacing={1}>
              <Typography variant="body2" color="text.secondary">
                Already have an account?
              </Typography>
              <Link
                component={RouterLink}
                to="/login"
                variant="body2"
                underline="hover"
              >
                Sign in
              </Link>
            </Stack>
          </Box>
        </Box>
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            position: "relative",
            backgroundImage:
              "url(https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
          }}
        >
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              p: 4,
              color: "white",
              zIndex: 1,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Welcome to Srible
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Join our community and start your journey with us today. Create,
              share, and connect with like-minded people.
            </Typography>
          </Box>
        </Box>
      </Paper>
      <Typography
        variant="caption"
        color="text.secondary"
        display="block"
        textAlign="center"
        mt={2}
      >
        By clicking continue, you agree to our{" "}
        <Link href="#" color="primary" underline="hover">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="#" color="primary" underline="hover">
          Privacy Policy
        </Link>
        .
      </Typography>
    </Container>
  );
}
