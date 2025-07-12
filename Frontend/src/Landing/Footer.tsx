import { Box, Typography, Container, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const FooterContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6, 0),
  backgroundColor: 'transparent',
  borderTop: `1px solid ${theme.palette.divider}`,
  marginTop: theme.spacing(8),
}));

const FooterContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  gap: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign: 'left',
  },
}));

const BrandText = styled(Typography)({
  fontWeight: 700,
  letterSpacing: '0.05em',
  textTransform: 'none',
});

const FooterLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textDecoration: 'none',
  fontSize: '0.875rem',
  '&:hover': {
    color: theme.palette.primary.main,
  },
}));

const SocialLinks = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(3),
  marginTop: theme.spacing(1),
  '& a': {
    color: theme.palette.text.secondary,
    transition: 'color 0.2s ease',
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
}));

const CopyrightText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '0.875rem',
}));

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/yosrible/srible' },
  { name: 'X', url: 'https://x.com/yosrible' },
  { name: 'Discord', url: 'https://discord.gg/Q8y4VAThFm' },
];

export const Footer = () => (
  <FooterContainer>
    <Container maxWidth="lg">
      <FooterContent>
        <Box sx={{ mb: { xs: 2, sm: 0 } }}>
          <BrandText variant="h6" sx={{ mb: 1 }}>
            srible
          </BrandText>
          <CopyrightText>
            © {new Date().getFullYear()} srible. All rights reserved.
          </CopyrightText>
        </Box>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', sm: 'flex-end' } }}>
          <SocialLinks>
            {socialLinks.map((social) => (
              <MuiLink
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
              >
                {social.name}
              </MuiLink>
            ))}
          </SocialLinks>
          <Box sx={{ mt: 2, display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
            <FooterLink to="/privacy">
              Privacy
            </FooterLink>
            <FooterLink to="/terms">
              Terms
            </FooterLink>
          </Box>
        </Box>
      </FooterContent>
    </Container>
  </FooterContainer>
);
