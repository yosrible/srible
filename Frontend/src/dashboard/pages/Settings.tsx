import React, { useState } from 'react';
import {
  Typography,
  Box,
  Button,
  TextField,
  Paper,
  Avatar,
  Switch,
  FormControl,
  FormControlLabel,
  MenuItem,
  InputAdornment,
  IconButton,
  styled,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import {
  CameraAltOutlined as CameraAltIcon,
  VisibilityOutlined as VisibilityIcon,
  VisibilityOffOutlined as VisibilityOffIcon,
  SaveOutlined as SaveIcon,
  EmailOutlined as EmailIcon,
  LockOutlined as LockIcon,
  AccountCircleOutlined as AccountIcon,
  SecurityOutlined as SecurityIcon,
  NotificationsNoneOutlined as NotificationsActiveIcon,
  PrivacyTipOutlined as PrivacyIcon,
} from '@mui/icons-material';

const SectionCard = styled(Paper)(({ theme }) => ({
  padding: '28px 32px',
  borderRadius: '12px',
  boxShadow: 'none',
  marginBottom: '24px',
  transition: 'all 0.2s ease-in-out',
  backgroundColor: 'transparent',
  border: '1px solid',
  borderColor: theme.palette.mode === 'dark' 
    ? 'rgba(255, 255, 255, 0.08)' 
    : 'rgba(0, 0, 0, 0.08)',
  width: '100%',
  '&:hover': {
    borderColor: theme.palette.mode === 'dark' 
      ? 'rgba(255, 255, 255, 0.2)' 
      : 'rgba(0, 0, 0, 0.2)',
  },
}));

const SectionTitle = ({ icon, title }: { icon: React.ReactNode; title: string }) => (
  <Box sx={{ 
    display: 'flex', 
    alignItems: 'center', 
    mb: 4,
    paddingBottom: '16px',
    borderBottom: '1px solid',
    borderColor: 'divider',
    gap: 2
  }}>
    <Box sx={{
      width: '40px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'text.secondary'
    }}>
      <Box sx={{ fontSize: '24px' }}>
        {icon}
      </Box>
    </Box>
    <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
      {title}
    </Typography>
  </Box>
);

// Using default Switch component without custom styling
const StyledSwitch = Switch;

export default function Settings() {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [settings, setSettings] = useState({
    firstName: '',
    lastName: '',
    blogName: 'My Blog', // Default blog name
    domainName: 'myblog', // Domain name without .srible.com
    bio: '',
    email: '',
    username: '',
    timezone: '',
    language: '',
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
    profileVisibility: 'public',
    searchEngineIndexing: true,
    activityStatus: true,
  });

  // State for delete blog dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [confirmationText, setConfirmationText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  const handleDeleteBlog = async () => {
    if (confirmationText !== `delete ${settings.blogName}`) {
      setDeleteError('Please type the blog name exactly as shown to confirm deletion');
      return;
    }

    setIsDeleting(true);
    setDeleteError('');
    
    try {
      // TODO: Implement actual delete API call
      // await deleteBlog(settings.blogId);
      console.log('Blog deleted successfully');
      // Redirect to home or login page after successful deletion
      // navigate('/');
    } catch (error) {
      console.error('Error deleting blog:', error);
      setDeleteError('Failed to delete blog. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setSettings({
      ...settings,
      [field]: value,
    });
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 4 }, maxWidth: '1200px', mx: 'auto', width: '100%' }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
          Settings
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Manage your account settings and preferences
        </Typography>
      </Box>

      {/* Profile Section */}
      <SectionCard>
        <SectionTitle icon={<AccountIcon />} title="Profile Information" />
        
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3, mb: 3 }}>
          <TextField 
            label="Blog Name" 
            value={settings.blogName}
            onChange={handleChange('blogName')}
            placeholder="Enter your blog name"
            fullWidth 
            size="small" 
            InputLabelProps={{ shrink: true }}
          />
          <Box sx={{ position: 'relative' }}>
            <TextField 
              label="Domain Name" 
              value={settings.domainName}
              onChange={handleChange('domainName')}
              placeholder="yoursubdomain"
              fullWidth 
              size="small" 
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LanguageIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end" sx={{ mr: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      .srible.com
                    </Typography>
                  </InputAdornment>
                ),
              }}
            />
            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
              Your blog will be available at: {settings.domainName || 'yoursubdomain'}.srible.com
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', mb: 3, gap: 3 }}>
          <Avatar sx={{ 
            width: 64, 
            height: 64, 
            bgcolor: 'action.hover',
            color: 'text.secondary'
          }}>
            <AccountIcon sx={{ fontSize: 32 }} />
          </Avatar>
          <Button 
            variant="contained" 
            startIcon={<CameraAltIcon />}
            disableElevation
            sx={{ 
              alignSelf: { xs: 'stretch', sm: 'center' }, 
              flexShrink: 0,
              borderRadius: '8px',
              px: 2,
              py: 0.75,
              textTransform: 'none',
              bgcolor: 'grey.900',
              color: 'common.white',
              '&:hover': {
                bgcolor: 'grey.800',
              }
            }}
          >
            Change Photo
          </Button>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3, mb: 3 }}>
          <TextField 
            label="First Name" 
            value={settings.firstName}
            onChange={handleChange('firstName')}
            placeholder="Enter your first name"
            fullWidth 
            size="small" 
            InputLabelProps={{ shrink: true }}
          />
          <TextField 
            label="Last Name" 
            value={settings.lastName}
            onChange={handleChange('lastName')}
            placeholder="Enter your last name"
            fullWidth 
            size="small"
            InputLabelProps={{ shrink: true }}
          />
          <Box sx={{ gridColumn: '1 / -1' }}>
            <TextField 
              label="Bio" 
              value={settings.bio}
              onChange={handleChange('bio')}
              placeholder="Tell us about yourself..."
              fullWidth 
              size="small" 
              multiline 
              rows={3} 
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </Box>
        
        <Button 
          variant="contained"
          startIcon={<SaveIcon />}
          disableElevation
          size="small"
          sx={{ 
            mt: 2,
            px: 2.5,
            py: 0.6,
            fontSize: '0.8125rem',
            fontWeight: 500,
            textTransform: 'none',
            borderRadius: '6px',
            bgcolor: 'grey.900',
            color: 'common.white',
            transition: 'all 0.2s ease',
            '&:hover': {
              bgcolor: 'grey.800',
            }
          }}
        >
          Save Profile
        </Button>
      </SectionCard>
      {/* Account Section */}
      <SectionCard>
        <SectionTitle icon={<EmailIcon />} title="Account Settings" />
        
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3, mb: 3 }}>
          <TextField
            label="Email Address"
            value={settings.email}
            onChange={handleChange('email')}
            placeholder="your.email@example.com"
            fullWidth
            size="small"
            type="email"
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
          
          <TextField
            label="Username"
            value={settings.username}
            onChange={handleChange('username')}
            placeholder="Choose a username"
            fullWidth
            size="small"
            InputLabelProps={{ shrink: true }}
          />
          
          <TextField
            label="Time Zone"
            value={settings.timezone}
            onChange={handleChange('timezone')}
            placeholder="Select your time zone"
            fullWidth
            size="small"
            select
            InputLabelProps={{ shrink: true }}
          >
            <MenuItem value="" disabled>Select your time zone</MenuItem>
            <MenuItem value="UTC-8 (Pacific Time)">UTC-8 (Pacific Time)</MenuItem>
            <MenuItem value="UTC-7 (Mountain Time)">UTC-7 (Mountain Time)</MenuItem>
            <MenuItem value="UTC-6 (Central Time)">UTC-6 (Central Time)</MenuItem>
            <MenuItem value="UTC-5 (Eastern Time)">UTC-5 (Eastern Time)</MenuItem>
          </TextField>
          
          <TextField
            label="Language"
            value={settings.language}
            onChange={handleChange('language')}
            placeholder="Select your language"
            fullWidth
            size="small"
            select
            InputLabelProps={{ shrink: true }}
          >
            <MenuItem value="" disabled>Select your language</MenuItem>
            <MenuItem value="English">English</MenuItem>
            <MenuItem value="Spanish">Spanish</MenuItem>
            <MenuItem value="French">French</MenuItem>
            <MenuItem value="German">German</MenuItem>
          </TextField>
        </Box>
        
        <Button 
          variant="contained"
          startIcon={<SaveIcon />}
          disableElevation
          size="small"
          sx={{ 
            mt: 2,
            px: 2.5,
            py: 0.6,
            fontSize: '0.8125rem',
            fontWeight: 500,
            textTransform: 'none',
            borderRadius: '6px',
            bgcolor: 'grey.900',
            color: 'common.white',
            transition: 'all 0.2s ease',
            '&:hover': {
              bgcolor: 'grey.800',
            }
          }}
        >
          Save Account Settings
        </Button>
      </SectionCard>
      {/* Security Section */}
      <SectionCard>
        <SectionTitle icon={<SecurityIcon />} title="Security Settings" />
        
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3, mb: 3 }}>
          <TextField
            label="Current Password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            size="small"
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    size="small"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          
          <TextField
            label="New Password"
            type={showNewPassword ? 'text' : 'password'}
            fullWidth
            size="small"
            InputLabelProps={{ shrink: true }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    edge="end"
                    size="small"
                  >
                    {showNewPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Last password change: 2 months ago
          </Typography>
          <Button 
            variant="contained"
            startIcon={<SaveIcon />}
            disableElevation
            size="small"
            sx={{ 
              mt: 2,
              px: 2.5,
              py: 0.6,
              fontSize: '0.8125rem',
              fontWeight: 500,
              textTransform: 'none',
              borderRadius: '6px',
              bgcolor: 'grey.900',
              color: 'common.white',
              transition: 'all 0.2s ease',
              '&:hover': {
                bgcolor: 'grey.800',
              }
            }}
          >
            Update Password
          </Button>
        </Box>
      </SectionCard>
      {/* Notifications Section */}
      <SectionCard>
        <SectionTitle icon={<NotificationsActiveIcon sx={{ stroke: 'currentColor' }} />} title="Notification Settings" />
        
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Box>
              <Typography variant="body1" fontWeight={500}>Email Notifications</Typography>
              <Typography variant="body2" color="text.secondary">Receive email notifications</Typography>
            </Box>
            <StyledSwitch 
              checked={settings.emailNotifications}
              onChange={handleChange('emailNotifications')}
            />
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5 }}>
            <Box>
              <Typography variant="body1" fontWeight={500}>Push Notifications</Typography>
              <Typography variant="body2" color="text.secondary">Receive browser notifications</Typography>
            </Box>
            <StyledSwitch 
              checked={settings.pushNotifications}
              onChange={handleChange('pushNotifications')}
            />
          </Box>
        </Box>
        
        <Button 
          variant="contained"
          startIcon={<SaveIcon />}
          disableElevation
          size="small"
          sx={{ 
            mt: 2,
            px: 2.5,
            py: 0.6,
            fontSize: '0.8125rem',
            fontWeight: 500,
            textTransform: 'none',
            borderRadius: '6px',
            bgcolor: 'grey.900',
            color: 'common.white',
            transition: 'all 0.2s ease',
            '&:hover': {
              bgcolor: 'grey.800',
            }
          }}
        >
          Save Notification Settings
        </Button>
      </SectionCard>

      {/* Privacy Section */}
      <SectionCard>
        <SectionTitle icon={<PrivacyIcon />} title="Privacy Settings" />
        
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Box>
              <Typography variant="body1" fontWeight={500}>Profile Visibility</Typography>
              <Typography variant="body2" color="text.secondary">Make your profile visible</Typography>
            </Box>
            <FormControlLabel
              control={
                <StyledSwitch
                  checked={settings.profileVisibility === 'public'}
                  onChange={(e) => setSettings({...settings, profileVisibility: e.target.checked ? 'public' : 'private'})}
                />
              }
              label="Make profile public"
            />
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5 }}>
            <Box>
              <Typography variant="body1" fontWeight={500}>Search Engine Indexing</Typography>
              <Typography variant="body2" color="text.secondary">Allow search engines to index your profile</Typography>
            </Box>
            <StyledSwitch 
              checked={settings.searchEngineIndexing}
              onChange={handleChange('searchEngineIndexing')}
            />
          </Box>
        </Box>
        
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Last updated: {new Date().toLocaleDateString()}
          </Typography>
          <Button 
            variant="contained"
            startIcon={<SaveIcon />}
            disableElevation
            size="small"
            sx={{ 
              mt: 2,
              px: 2.5,
              py: 0.6,
              fontSize: '0.8125rem',
              fontWeight: 500,
              textTransform: 'none',
              borderRadius: '6px',
              bgcolor: 'grey.900',
              color: 'common.white',
              transition: 'all 0.2s ease',
              '&:hover': {
                bgcolor: 'grey.800',
              }
            }}
          >
            Save Privacy Settings
          </Button>
        </Box>
      </SectionCard>

      {/* Danger Zone */}
      <SectionCard>
        <SectionTitle 
          icon={<SecurityIcon color="error" />} 
          title="Danger Zone" 
        />
        <Box sx={{ 
          p: 3, 
          borderRadius: 2, 
          bgcolor: 'error.light',
          background: (theme) => 
            theme.palette.mode === 'dark' 
              ? 'rgba(211, 47, 47, 0.08)' 
              : 'rgba(211, 47, 47, 0.04)',
          border: '1px solid',
          borderColor: 'error.light',
        }}>
          <Typography variant="h6" color="error" gutterBottom>
            Delete Your Blog
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            This action cannot be undone. This will permanently delete your blog, all posts, and all associated data. 
            Please be certain before proceeding.
          </Typography>
          
          <Box sx={{ mt: 2, maxWidth: 500 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Type <strong>DELETE {settings.blogName.toUpperCase()}</strong> to confirm
            </Typography>
            <TextField
              fullWidth
              size="small"
              value={confirmationText}
              onChange={(e) => setConfirmationText(e.target.value)}
              error={!!deleteError}
              helperText={deleteError}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              color="error"
              onClick={() => setDeleteDialogOpen(true)}
              disabled={confirmationText !== `DELETE ${settings.blogName.toUpperCase()}`}
              sx={{ textTransform: 'none' }}
            >
              Delete Blog Permanently
            </Button>
          </Box>
        </Box>
      </SectionCard>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => !isDeleting && setDeleteDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ color: 'error.main', fontWeight: 600 }}>
          Delete Blog Confirmation
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete your blog <strong>{settings.blogName}</strong>? 
            This action cannot be undone and all your data will be permanently deleted.
          </DialogContentText>
          {deleteError && (
            <Typography color="error" variant="body2" sx={{ mt: 2 }}>
              {deleteError}
            </Typography>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
          <Button 
            onClick={() => setDeleteDialogOpen(false)}
            disabled={isDeleting}
            sx={{ textTransform: 'none' }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteBlog}
            color="error"
            variant="contained"
            disabled={isDeleting}
            sx={{ textTransform: 'none' }}
          >
            {isDeleting ? 'Deleting...' : 'Yes, Delete My Blog'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}