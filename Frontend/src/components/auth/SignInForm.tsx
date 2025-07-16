import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
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

interface SignInFormProps {
  className?: string;
}

export function SignInForm({ className }: SignInFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign in logic here
    console.log("Signing in with:", { email, password });
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
            Welcome back
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            gutterBottom
            sx={{ mb: 4 }}
          >
            Sign in to your account
          </Typography>

          <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleLogo />}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
              }}
            >
              Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<GitHubIcon />}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
              }}
            >
              GitHub
            </Button>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", my: 3 }}>
            <Divider sx={{ flex: 1 }} />
            <Typography variant="body2" sx={{ px: 2, color: "text.secondary" }}>
              OR
            </Typography>
            <Divider sx={{ flex: 1 }} />
          </Box>

          <Box component="form" onSubmit={handleSubmit} noValidate>
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
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 1 }}
            />
            <Box sx={{ textAlign: 'right', mb: 3 }}>
              <Link
                component={RouterLink}
                to="/forgot-password"
                variant="body2"
                color="primary"
                underline="hover"
              >
                Forgot password?
              </Link>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 2, mb: 3, py: 1.5 }}
            >
              Sign In
            </Button>

            <Stack direction="row" spacing={1} justifyContent="center" mt={2}>
              <Typography variant="body2" color="text.secondary">
                Don't have an account?
              </Typography>
              <Link
                component={RouterLink}
                to="/signup"
                variant="body2"
                color="primary"
                underline="hover"
                sx={{ fontWeight: 600 }}
              >
                Sign up
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
        />
      </Paper>
    </Container>
  );
}
