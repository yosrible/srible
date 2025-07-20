import { useState } from "react";
import { Box, Card, Typography, Button, Stack } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const themes = [
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean and distraction-free interface",
    colors: {
      primary: "#3182CE",
      background: "#FFFFFF",
      surface: "#F7FAFC",
      text: "#1A202C",
    },
  },
  {
    id: "dark",
    name: "Dark",
    description: "Elegant dark theme for comfortable viewing",
    colors: {
      primary: "#63B3ED",
      background: "#1A202C",
      surface: "#2D3748",
      text: "#E2E8F0",
    },
  },
  {
    id: "nature",
    name: "Nature",
    description: "Calming green tones inspired by nature",
    colors: {
      primary: "#38A169",
      background: "#F0FFF4",
      surface: "#C6F6D5",
      text: "1A202C",
    },
  },
];

export default function ThemesPage() {
  const [activeTheme, setActiveTheme] = useState("minimal");

  return (
    <Box maxWidth="lg" mx="auto" p={{ xs: 2, sm: 3 }}>
      <Typography variant="h5" fontWeight={600} mb={1}>
        Theme Settings
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        Select your preferred theme
      </Typography>
      
      <Stack 
        spacing={3} 
        direction={{ xs: 'column', md: 'row' }}
        alignItems={{ xs: 'center', md: 'stretch' }}
        justifyContent={{ xs: 'center', md: 'flex-start' }}
        width="100%"
      >
        {themes.map((theme) => (
          <Card
            key={theme.id}
            variant="outlined"
            sx={{
              width: { xs: '100%', sm: 280 },
              maxWidth: '100%',
              border: activeTheme === theme.id ? `2px solid ${theme.colors.primary}` : '1px solid #e2e8f0',
              borderRadius: 2,
              overflow: 'hidden',
              transition: 'all 0.2s',
              '&:hover': {
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
              },
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}
            onClick={() => setActiveTheme(theme.id)}
          >
            <Box
              sx={{
                height: 120,
                bgcolor: theme.colors.background,
                borderBottom: `1px solid ${theme.colors.surface}`,
                p: 2,
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: 12,
                  left: 12,
                  right: 12,
                  height: 8,
                  borderRadius: 4,
                  bgcolor: theme.colors.surface,
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: 28,
                  left: 12,
                  width: '40%',
                  height: 8,
                  borderRadius: 4,
                  bgcolor: theme.colors.surface,
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 12,
                  right: 12,
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  bgcolor: theme.colors.primary,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {activeTheme === theme.id && (
                  <CheckCircleIcon sx={{ color: 'white', fontSize: 16 }} />
                )}
              </Box>
            </Box>
            
            <Box p={3} sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="subtitle1" fontWeight={600}>
                  {theme.name}
                </Typography>
                {activeTheme === theme.id && (
                  <Box
                    sx={{
                      bgcolor: '#E6FFFA',
                      color: '#00B5D8',
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 4,
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                  >
                    Active
                  </Box>
                )}
              </Box>
              <Typography variant="body2" color="text.secondary" mb={2}>
                {theme.description}
              </Typography>
              
              <Stack direction="row" spacing={1} mt="auto" pt={2}>
                {Object.entries(theme.colors).map(([key, color]) => (
                  <Box
                    key={key}
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: '4px',
                      bgcolor: color,
                      border: '1px solid rgba(0,0,0,0.05)',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'scale(1.1)',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                      },
                      transition: 'all 0.2s',
                    }}
                    title={`${key}: ${color}`}
                  />
                ))}
              </Stack>
              
              <Button
                fullWidth
                variant={activeTheme === theme.id ? 'contained' : 'outlined'}
                sx={(muiTheme) => ({
                  mt: 3,
                  bgcolor: activeTheme === theme.id 
                    ? muiTheme.palette.mode === 'dark' ? '#4a4a4a' : '#333333' 
                    : 'transparent',
                  color: activeTheme === theme.id 
                    ? muiTheme.palette.common.white 
                    : muiTheme.palette.mode === 'dark' 
                      ? 'rgba(255, 255, 255, 0.7)' 
                      : 'rgba(0, 0, 0, 0.7)',
                  borderColor: muiTheme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
                  '&:hover': {
                    bgcolor: activeTheme === theme.id 
                      ? muiTheme.palette.mode === 'dark' ? '#5a5a5a' : '#4a4a4a' 
                      : muiTheme.palette.mode === 'dark' 
                        ? 'rgba(255, 255, 255, 0.08)' 
                        : 'rgba(0, 0, 0, 0.04)',
                    borderColor: muiTheme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',
                    boxShadow: 'none',
                    color: activeTheme === theme.id 
                      ? muiTheme.palette.common.white 
                      : muiTheme.palette.mode === 'dark' 
                        ? 'rgba(255, 255, 255, 0.9)' 
                        : 'rgba(0, 0, 0, 0.8)',
                  },
                  '&:active': {
                    transform: 'scale(0.98)',
                    bgcolor: activeTheme === theme.id 
                      ? muiTheme.palette.mode === 'dark' ? '#3a3a3a' : '#292929' 
                      : muiTheme.palette.mode === 'dark' 
                        ? 'rgba(255, 255, 255, 0.12)' 
                        : 'rgba(0, 0, 0, 0.06)',
                  },
                  transition: 'all 0.2s ease',
                  fontWeight: 500,
                  letterSpacing: '0.5px',
                  textTransform: 'none',
                  fontSize: '0.875rem',
                  opacity: activeTheme === theme.id ? 1 : 0.8,
                })}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveTheme(theme.id);
                }}
              >
                {activeTheme === theme.id ? 'Selected' : 'Select Theme'}
              </Button>
            </Box>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}
