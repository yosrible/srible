import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'background.default',
        p: 3,
        textAlign: 'center'
      }}
    >
        <Typography 
          component="h1" 
          variant="h4" 
          sx={{ 
            mb: 3, 
            fontWeight: 700,
            fontFamily: 'Geist, sans-serif',
            textAlign: 'center',
            color: '#000',
            letterSpacing: '-0.02em'
          }}
        >
          Create your Srible account
        </Typography>
        <Typography 
          variant="h6" 
          sx={{ 
            mb: 4, 
            textAlign: 'center',
            fontWeight: 600,
            color: '#666',
            fontFamily: 'Geist, sans-serif'
          }}
        >
          You can't sign up yet, we're still building
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          sx={{ 
            mt: 3, 
            mb: 2,
            '&:hover': {
              color: '#fff' // Keep text color white on hover
            }
          }}
        >
          Back to Home
        </Button>

    </Box>
  );
};

export default SignUpPage;
