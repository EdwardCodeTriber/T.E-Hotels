import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#172554',
        color: 'white',
        py: 3,
        mt: 4,
        textAlign: 'center',
      }}
    >
      <Container>
        <Typography variant="body1">
          &copy; {new Date().getFullYear()} T.E. Hotels. All rights reserved.
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          <Link href="/terms" color="inherit" underline="hover">
            Terms of Service
          </Link>{' '}
          |{' '}
          <Link href="/privacy" color="inherit" underline="hover">
            Privacy Policy
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
