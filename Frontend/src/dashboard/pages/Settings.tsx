import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  Button,
  TextField,
  Switch,
  Avatar,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  Person as PersonIcon,
  // Email as EmailIcon,
  // Notifications as NotificationsIcon,
  // Security as SecurityIcon,
  // Shield as ShieldIcon,
  CameraAlt as CameraAltIcon,
  Visibility,
  VisibilityOff,
  Save as SaveIcon,
} from "@mui/icons-material";


export default function Settings() {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  return (
    <Box sx={{ width: "100%", maxWidth: 600, mx: "auto", p: { xs: 1, sm: 2 } }}>
      <Box mb={3}>
        <Typography variant="h4" fontWeight={700}>Settings</Typography>
        <Typography variant="body2" color="text.secondary">
          Manage your account settings and preferences
        </Typography>
      </Box>
      <Card elevation={3} sx={{ width: "100%" }}>
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          {/* Profile */}
          <Stack spacing={3} mb={5}>
            <Typography variant="h6" mb={1}>Profile Information</Typography>
            <Stack direction="row" spacing={3} alignItems="center" justifyContent="center">
              <Avatar sx={{ width: 64, height: 64 }}>
                <PersonIcon fontSize="large" />
              </Avatar>
              <Button variant="outlined" startIcon={<CameraAltIcon />}>Change Photo</Button>
            </Stack>
            <Box display="flex" flexWrap="wrap" gap={2}>
              <Box flex={{ xs: "1 1 100%", sm: "1 1 48%" }}>
                <TextField label="First Name" defaultValue="John" fullWidth size="small" />
              </Box>
              <Box flex={{ xs: "1 1 100%", sm: "1 1 48%" }}>
                <TextField label="Last Name" defaultValue="Doe" fullWidth size="small" />
              </Box>
              <Box flex="1 1 100%">
                <TextField label="Bio" defaultValue="Frontend developer passionate about creating beautiful user experiences." fullWidth size="small" multiline rows={3} />
              </Box>
            </Box>
            <Button variant="contained" startIcon={<SaveIcon />}>Save Profile</Button>
          </Stack>
          {/* Account */}
          <Stack spacing={3} mb={5}>
            <Typography variant="h6" mb={1}>Account Settings</Typography>
            <Box display="flex" flexWrap="wrap" gap={2}>
              <Box flex={{ xs: "1 1 100%", sm: "1 1 48%" }}>
                <TextField label="Email Address" defaultValue="john.doe@example.com" fullWidth size="small" />
              </Box>
              <Box flex={{ xs: "1 1 100%", sm: "1 1 48%" }}>
                <TextField label="Username" defaultValue="johndoe" fullWidth size="small" />
              </Box>
              <Box flex={{ xs: "1 1 100%", sm: "1 1 48%" }}>
                <TextField label="Time Zone" defaultValue="UTC-8 (Pacific Time)" fullWidth size="small" />
              </Box>
              <Box flex={{ xs: "1 1 100%", sm: "1 1 48%" }}>
                <TextField label="Language" defaultValue="English" fullWidth size="small" />
              </Box>
            </Box>
            <Button variant="contained" startIcon={<SaveIcon />}>Save Account</Button>
          </Stack>
          {/* Security */}
          <Stack spacing={3} mb={5}>
            <Typography variant="h6" mb={1}>Security Settings</Typography>
            <Box display="flex" flexWrap="wrap" gap={2}>
              <Box flex={{ xs: "1 1 100%", sm: "1 1 48%" }}>
                <TextField
                  label="Current Password"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword((v) => !v)} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box flex={{ xs: "1 1 100%", sm: "1 1 48%" }}>
                <TextField
                  label="New Password"
                  type={showNewPassword ? "text" : "password"}
                  fullWidth
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowNewPassword((v) => !v)} edge="end">
                          {showNewPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Box>
            <Button variant="contained" startIcon={<SaveIcon />}>Update Password</Button>
          </Stack>
          {/* Notifications */}
          <Stack spacing={3} mb={5}>
            <Typography variant="h6" mb={1}>Notification Settings</Typography>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography>Email Notifications</Typography>
              <Switch defaultChecked />
            </Stack>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography>Push Notifications</Typography>
              <Switch />
            </Stack>
            <Button variant="contained" startIcon={<SaveIcon />}>Save Notifications</Button>
          </Stack>
          {/* Privacy */}
          <Stack spacing={3}>
            <Typography variant="h6" mb={1}>Privacy Settings</Typography>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography>Profile Visibility</Typography>
              <Switch defaultChecked />
            </Stack>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography>Search Engine Indexing</Typography>
              <Switch />
            </Stack>
            <Button variant="contained" startIcon={<SaveIcon />}>Save Privacy</Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}