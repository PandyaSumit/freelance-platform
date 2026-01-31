import React from 'react';
import { Box, CircularProgress, Typography, useTheme } from '@mui/material';
import Logo from './Logo';

interface LoadingScreenProps {
  message?: string;
  fullScreen?: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message = 'Loading...',
  fullScreen = true,
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: fullScreen ? '100vh' : 400,
        width: '100%',
        backgroundColor: fullScreen ? theme.palette.background.default : 'transparent',
        gap: 3,
      }}
    >
      <Logo size="large" />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <CircularProgress size={24} thickness={4} />
        <Typography variant="body2" color="text.secondary">
          {message}
        </Typography>
      </Box>
    </Box>
  );
};

export default LoadingScreen;
