import { useState } from "react";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Paper,
  Stack,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BrushIcon from "@mui/icons-material/Brush";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import NightsStayIcon from "@mui/icons-material/NightsStay";

const themes = [
  {
    name: "Minimal",
    description: "A clean, distraction-free look for focused writing.",
    preview: "🌿",
    colors: ["#f5f5f5", "#e0e0e0", "#333"],
    icon: <BrushIcon color="success" />,
  },
  {
    name: "Retro",
    description: "Old-school vibes with a modern twist.",
    preview: "🕹️",
    colors: ["#fffbe6", "#ffd700", "#222"],
    icon: <SportsEsportsIcon color="warning" />,
  },
  {
    name: "Dark Knight",
    description: "A sleek, dark theme for night owls.",
    preview: "🌑",
    colors: ["#18181b", "#23272f", "#fff"],
    icon: <NightsStayIcon color="primary" />,
  },
];

export default function ThemesPage() {
  const [activeTheme, setActiveTheme] = useState("Minimal");
  const [applying, setApplying] = useState<string | null>(null);

  return (
    <Box maxWidth="md" mx="auto" p={{ xs: 1, sm: 2 }}>
      <Typography variant="h4" fontWeight={700} mb={1} fontSize={{ xs: 24, sm: 32 }}>
        Choose Your Style
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        mb={4}
        maxWidth={500}
        fontSize={{ xs: 14, sm: 16 }}
      >
        Personalize your dashboard with a theme that matches your vibe. Preview and apply instantly!
      </Typography>
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        flexWrap="wrap"
        gap={{ xs: 2, sm: 3 }}
        alignItems="stretch"
        justifyContent="center"
      >
        {themes.map((theme) => (
          <Box
            key={theme.name}
            flex={{ xs: "1 1 100%", md: "1 1 45%" }}
            minWidth={{ xs: "100%", md: 320 }}
            maxWidth={{ xs: "100%", md: 400 }}
            display="flex"
          >
            <Card
              elevation={3}
              sx={{
                borderRadius: 3,
                transition: "box-shadow 0.2s",
                cursor: "pointer",
                "&:hover": { boxShadow: 6 },
                minHeight: { xs: 220, sm: 260, md: 320 },
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <CardHeader
                avatar={
                  <Box fontSize={{ xs: 24, sm: 32 }} mr={1}>
                    {theme.icon}
                  </Box>
                }
                title={
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography variant="h6" fontWeight={600} fontSize={{ xs: 16, sm: 20 }}>
                      {theme.name}
                    </Typography>
                    {activeTheme === theme.name && (
                      <Chip
                        icon={<CheckCircleIcon color="success" />}
                        label="Active"
                        color="success"
                        size="small"
                        sx={{ fontWeight: 500 }}
                      />
                    )}
                  </Stack>
                }
                subheader={
                  <Typography variant="body2" color="text.secondary" fontSize={{ xs: 12, sm: 14 }}>
                    {theme.description}
                  </Typography>
                }
                sx={{ pb: 0 }}
              />
              <CardContent
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  px: { xs: 1, sm: 2 },
                  py: { xs: 1, sm: 2 },
                }}
              >
              <Box mb={1} mt={{ xs: 0, sm: 1 }}>
                <Typography fontSize={{ xs: 32, sm: 48 }} aria-label={theme.name}>
                  {theme.preview}
                </Typography>
              </Box>
              <Stack
                  direction="row"
                  spacing={1}
                  mb={1}
                  sx={{
                    width: "100%",
                    justifyContent: { xs: "center", sm: "flex-start" },
                  }}
              >
                  {theme.colors.map((color) => (
                    <Box
                      key={color}
                      sx={{
                        width: { xs: 20, sm: 28 },
                        height: { xs: 20, sm: 28 },
                        borderRadius: 1,
                        bgcolor: color,
                        border: "1px solid #e0e0e0",
                        boxShadow: 1,
                      }}
                    />
                  ))}
                </Stack>
                <Paper
                  variant="outlined"
                  sx={{
                    width: "100%",
                    height: { xs: 28, sm: 36 },
                    mt: 1,
                    bgcolor: theme.colors[0],
                    borderColor: theme.colors[1],
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: theme.colors[2],
                    fontWeight: 500,
                    fontSize: { xs: 12, sm: 14 },
                  }}
                  elevation={0}
                >
                  Dashboard Preview
                </Paper>
              </CardContent>
              <CardActions
                sx={{
                  justifyContent: "flex-end",
                  gap: 1,
                  mt: "auto",
                  pb: { xs: 1, sm: 2 },
                  pr: { xs: 1, sm: 2 },
                }}
              >
                {activeTheme !== theme.name && (
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => setActiveTheme(theme.name)}
                  >
                    Set Active
                  </Button>
                )}
                <Button
                  variant="outlined"
                  color="secondary"
                  size="small"
                  onClick={() => {
                    setApplying(theme.name);
                    setTimeout(() => setApplying(null), 1200);
                  }}
                  disabled={applying === theme.name}
                >
                  {applying === theme.name ? "Applying..." : "Apply"}
                </Button>
              </CardActions>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
