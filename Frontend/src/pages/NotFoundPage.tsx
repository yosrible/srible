import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
          px: 2,
        }}
      >
        <Box>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: '6rem',
              fontWeight: 300,
              color: 'text.primary',
              letterSpacing: '-0.05em',
              mb: 1,
            }}
          >
            404
          </Typography>
          
          <Typography
            variant="h6"
            component="h2"
            sx={{
              mb: 3,
              fontWeight: 400,
              color: 'text.secondary',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            Page Not Found
          </Typography>
          
          <Button
            variant="outlined"
            onClick={() => navigate('/')}
            sx={{
              mt: 4,
              px: 4,
              py: 1,
              borderRadius: 0,
              borderWidth: '1px',
              borderColor: 'text.primary',
              color: 'text.primary',
              '&:hover': {
                borderWidth: '1px',
                borderColor: 'text.primary',
                backgroundColor: 'rgba(0, 0, 0, 0.02)',
              },
            }}
          >
            Return Home
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
