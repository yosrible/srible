import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

export const PrivacyPage = () => {
  return (
    <Box sx={{ 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      py: 8,
      px: 2,
      maxWidth: '800px',
      mx: 'auto',
      textAlign: 'center'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h2" component="h1" gutterBottom fontWeight={800} sx={{ mb: 4, fontSize: { xs: '2.5rem', md: '3rem' } }}>
          Privacy Policy
        </Typography>
        
        <Typography variant="body1" color="text.secondary" sx={{ mb: 6, fontSize: '1.1rem', lineHeight: 1.7 }}>
          Last Updated: July 12, 2025
        </Typography>

        <Box sx={{ textAlign: 'left', '& > div': { mb: 6 } }}>
          <Box>
            <Typography variant="h5" gutterBottom fontWeight={600}>
              Information We Collect
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
              We collect information that you provide directly to us, such as when you create an account or publish content. This includes your name, email, and any content you create.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" gutterBottom fontWeight={600}>
              How We Use Your Information
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
              We use your information to provide and improve our services, communicate with you, and ensure platform security. We never sell your personal information.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" gutterBottom fontWeight={600}>
              Data Security
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
              We implement strong security measures to protect your data. However, no online service is 100% secure, and we cannot guarantee absolute security.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" gutterBottom fontWeight={600}>
              Your Choices
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
              Update your account information anytime in settings. Contact us to request account deletion.
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 8, pt: 4, borderTop: '1px solid', borderColor: 'divider' }}>
          <Typography variant="body1" color="text.secondary">
            Questions about our privacy practices? Join our{' '}
            <a href="https://discord.gg/Q8y4VAThFm" target="_blank" rel="noopener noreferrer" style={{ color: '#5865F2', textDecoration: 'none' }}>
              Discord server
            </a>
          </Typography>
        </Box>
      </motion.div>
    </Box>
  );
};

export default PrivacyPage;
