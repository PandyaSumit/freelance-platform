import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Box, Container, Typography, useTheme, alpha } from '@mui/material';
import { Logo } from '../common';

const AuthLayout: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        backgroundColor: 'background.default',
      }}
    >
      {/* Left Side - Branding */}
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          width: '45%',
          background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 50%, ${alpha(theme.palette.primary.light, 0.9)} 100%)`,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: 6,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background Pattern */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            opacity: 0.1,
            backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
                             radial-gradient(circle at 75% 75%, white 2px, transparent 2px)`,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Decorative Circles */}
        <Box
          sx={{
            position: 'absolute',
            top: '-10%',
            right: '-10%',
            width: 400,
            height: 400,
            borderRadius: '50%',
            border: `1px solid ${alpha('#fff', 0.1)}`,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '-15%',
            left: '-10%',
            width: 500,
            height: 500,
            borderRadius: '50%',
            border: `1px solid ${alpha('#fff', 0.1)}`,
          }}
        />

        <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <Box sx={{ mb: 4 }}>
            <Logo size="large" color="white" />
          </Box>

          <Typography
            variant="h3"
            sx={{
              color: 'white',
              fontWeight: 700,
              mb: 2,
              maxWidth: 450,
            }}
          >
            Manage clients like a pro
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: alpha('#fff', 0.8),
              fontWeight: 400,
              maxWidth: 400,
              lineHeight: 1.6,
            }}
          >
            Stop chasing clients. Start building relationships with the client portal that makes you look professional.
          </Typography>

          {/* Feature Pills */}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1.5,
              justifyContent: 'center',
              mt: 4,
            }}
          >
            {['Share Work', 'Track Payments', 'Get Approvals', 'Look Professional'].map((feature) => (
              <Box
                key={feature}
                sx={{
                  px: 2,
                  py: 0.75,
                  borderRadius: 5,
                  backgroundColor: alpha('#fff', 0.15),
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${alpha('#fff', 0.2)}`,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ color: 'white', fontWeight: 500 }}
                >
                  {feature}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Testimonial */}
          <Box
            sx={{
              mt: 6,
              p: 3,
              borderRadius: 3,
              backgroundColor: alpha('#fff', 0.1),
              backdropFilter: 'blur(10px)',
              border: `1px solid ${alpha('#fff', 0.2)}`,
              maxWidth: 400,
              textAlign: 'left',
            }}
          >
            <Typography
              variant="body2"
              sx={{ color: alpha('#fff', 0.9), fontStyle: 'italic', mb: 2 }}
            >
              "FlowLance transformed how I work with clients. No more chasing approvals or payments!"
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: alpha('#fff', 0.2),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 600,
                  color: 'white',
                }}
              >
                MC
              </Box>
              <Box>
                <Typography variant="body2" sx={{ color: 'white', fontWeight: 600 }}>
                  Michael Chen
                </Typography>
                <Typography variant="caption" sx={{ color: alpha('#fff', 0.7) }}>
                  Freelance Designer
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Right Side - Form */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: { xs: 3, sm: 6 },
        }}
      >
        {/* Mobile Logo */}
        <Box sx={{ display: { xs: 'block', md: 'none' }, mb: 4 }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Logo size="large" />
          </Link>
        </Box>

        <Container maxWidth="sm">
          <Outlet />
        </Container>

        {/* Footer */}
        <Box
          sx={{
            mt: 'auto',
            pt: 4,
            textAlign: 'center',
          }}
        >
          <Typography variant="caption" color="text.secondary">
            © 2026 FlowLance. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default AuthLayout;
