import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Container,
  Avatar,
  IconButton,
  useTheme,
  CircularProgress,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";

interface OnboardingFormProps {
  onComplete: () => void;
}

export function OnboardingForm({ onComplete }: OnboardingFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    blogName: "",
    blogDescription: "",
    profilePicture: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          profilePicture: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // TODO: Replace with actual API call
      console.log("Submitting onboarding data:", formData);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      // Redirect to dashboard or home page after successful onboarding
      onComplete();
      navigate("/dashboard");
    } catch (error) {
      console.error("Error during onboarding:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container component="main" maxWidth="lg">
      <Paper
        elevation={3}
        sx={{
          p: 6,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          borderRadius: 3,
          mt: 4,
          minHeight: '70vh',
          gap: 4,
        }}
      >
        <Box sx={{ 
          flex: 1, 
          width: '100%',
          maxWidth: { md: '600px' },
          p: { xs: 0, md: 4 }
        }}>
          <Typography component="h1" variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
            Welcome to Srible! 🎉
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 4, fontSize: '1.1rem' }}
          >
            Let's set up your profile and get you started
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ width: "100%" }}
          >

            <TextField
              margin="normal"
              required
              fullWidth
              id="fullName"
              label="Full Name"
              name="fullName"
              autoComplete="name"
              autoFocus
              value={formData.fullName}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="blogName"
              label="Blog Name"
              name="blogName"
              value={formData.blogName}
              onChange={handleChange}
              sx={{ mb: 2 }}
              helperText="This will be displayed as your blog's title"
            />

            <TextField
              margin="normal"
              required
              fullWidth
              multiline
              rows={3}
              id="blogDescription"
              label="Blog Description"
              name="blogDescription"
              value={formData.blogDescription}
              onChange={handleChange}
              sx={{ mb: 3 }}
              helperText="Tell us what your blog is about"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isSubmitting}
              sx={{ 
                mt: 2, 
                mb: 2, 
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 500
              }}
            >
              {isSubmitting ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Get Started"
              )}
            </Button>
          </Box>
        </Box>

        <Box sx={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: 4,
          position: 'relative',
          minHeight: { xs: '300px', md: 'auto' },
          width: '100%',
          bgcolor: 'background.default',
          borderRadius: 2,
        }}>
          <Box sx={{ 
            position: 'relative',
            width: '100%',
            maxWidth: '400px',
            aspectRatio: '1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 3
          }}>
            {formData.profilePicture ? (
              <Avatar
                src={formData.profilePicture}
                sx={{
                  width: '100%',
                  height: '100%',
                  fontSize: '5rem',
                  bgcolor: theme.palette.primary.main,
                  '&.MuiAvatar-root': {
                    border: `4px solid ${theme.palette.background.paper}`,
                    boxShadow: theme.shadows[4],
                  }
                }}
              />
            ) : (
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'action.hover',
                  borderRadius: '50%',
                  border: `2px dashed ${theme.palette.divider}`,
                  p: 2,
                  textAlign: 'center',
                }}
              >
                <PhotoCamera fontSize="large" color="action" sx={{ mb: 1 }} />
                <Typography variant="caption" color="text.secondary">
                  No Photo
                </Typography>
              </Box>
            )}
            <input
              accept="image/*"
              id="profile-picture-upload"
              type="file"
              hidden
              onChange={handleImageUpload}
            />
            <label htmlFor="profile-picture-upload">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
                sx={{
                  position: 'absolute',
                  bottom: 16,
                  right: 16,
                  bgcolor: 'background.paper',
                  boxShadow: 3,
                  width: 48,
                  height: 48,
                  '&:hover': {
                    bgcolor: 'background.paper',
                    transform: 'scale(1.1)',
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                <PhotoCamera fontSize="medium" />
              </IconButton>
            </label>
          </Box>
          <Typography variant="body2" color="text.secondary" align="center">
            Upload a profile picture to personalize your account
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
