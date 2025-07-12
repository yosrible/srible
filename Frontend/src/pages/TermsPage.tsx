import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

export const TermsPage = () => {
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
          Terms of Service
        </Typography>
        
        <Typography variant="body1" color="text.secondary" sx={{ mb: 6, fontSize: '1.1rem', lineHeight: 1.7 }}>
          Last Updated: July 12, 2025
        </Typography>

        <Box sx={{ textAlign: 'left', '& > div': { mb: 6 } }}>
          <Box>
            <Typography variant="h5" gutterBottom fontWeight={600}>
              Acceptance of Terms
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
              By using Srible, you agree to these Terms of Service. If you don't agree, please don't use our service.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" gutterBottom fontWeight={600}>
              Your Account
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
              You're responsible for your account and everything that happens under it. Keep your password secure.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" gutterBottom fontWeight={600}>
              Your Content
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
              You own what you create. By posting on Srible, you give us permission to show it to others.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" gutterBottom fontWeight={600}>
              Rules
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, mb: 2 }}>
              Don't:
            </Typography>
            <Box component="ul" sx={{ pl: 3, '& li': { mb: 1, color: 'text.secondary' } }}>
              <li>Break any laws or infringe on others' rights</li>
              <li>Share harmful or malicious content</li>
              <li>Harass or impersonate others</li>
              <li>Try to break our service</li>
            </Box>
          </Box>
        </Box>

        <Box sx={{ mt: 8, pt: 4, borderTop: '1px solid', borderColor: 'divider' }}>
          <Typography variant="body1" color="text.secondary">
            Questions about our terms? Join our{' '}
            <a href="https://discord.gg/Q8y4VAThFm" target="_blank" rel="noopener noreferrer" style={{ color: '#5865F2', textDecoration: 'none' }}>
              Discord server
            </a>
          </Typography>
        </Box>
      </motion.div>
    </Box>
  );
};

export default TermsPage;
