import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { Bolt } from '@mui/icons-material';

interface LogoProps {
  variant?: 'full' | 'icon';
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'white';
}

const Logo: React.FC<LogoProps> = ({
  variant = 'full',
  size = 'medium',
  color = 'primary'
}) => {
  const theme = useTheme();

  const sizes = {
    small: { icon: 24, text: '1.125rem' },
    medium: { icon: 32, text: '1.5rem' },
    large: { icon: 40, text: '1.875rem' },
  };

  const colors = {
    primary: {
      icon: theme.palette.primary.main,
      text: theme.palette.text.primary,
    },
    white: {
      icon: '#fff',
      text: '#fff',
    },
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        cursor: 'pointer',
        userSelect: 'none',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: sizes[size].icon + 8,
          height: sizes[size].icon + 8,
          borderRadius: 2,
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          boxShadow: `0 4px 14px ${theme.palette.primary.main}40`,
        }}
      >
        <Bolt
          sx={{
            fontSize: sizes[size].icon,
            color: '#fff',
          }}
        />
      </Box>
      {variant === 'full' && (
        <Typography
          sx={{
            fontSize: sizes[size].text,
            fontWeight: 700,
            color: colors[color].text,
            letterSpacing: '-0.02em',
          }}
        >
          FlowLance
        </Typography>
      )}
    </Box>
  );
};

export default Logo;
