import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  useTheme,
  alpha,
} from '@mui/material';
import { ArrowForward, CheckCircle } from '@mui/icons-material';

const CTASection: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const benefits = [
    'Free forever plan available',
    'Setup in under 2 minutes',
    'No credit card required',
  ];

  return (
    <Box
      sx={{
        py: { xs: 12, md: 16 },
        position: 'relative',
        overflow: 'hidden',
        background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 50%, ${theme.palette.primary.light} 100%)`,
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

      {/* Decorative Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '-20%',
          left: '-10%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          border: `1px solid ${alpha('#fff', 0.1)}`,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '-30%',
          right: '-15%',
          width: 600,
          height: 600,
          borderRadius: '50%',
          border: `1px solid ${alpha('#fff', 0.1)}`,
        }}
      />

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              color: 'white',
              mb: 3,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            }}
          >
            Ready to look professional?
          </Typography>

          <Typography
            variant="h5"
            sx={{
              color: alpha('#fff', 0.85),
              fontWeight: 400,
              mb: 5,
              maxWidth: 600,
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            Join thousands of freelancers who stopped chasing clients and started building real relationships.
          </Typography>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
            sx={{ mb: 4 }}
          >
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              onClick={() => navigate('/signup')}
              sx={{
                px: 5,
                py: 2,
                fontSize: '1.1rem',
                backgroundColor: 'white',
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: alpha('#fff', 0.9),
                  transform: 'translateY(-2px)',
                },
                boxShadow: `0 8px 30px ${alpha('#000', 0.2)}`,
              }}
            >
              Start Your Free Trial
            </Button>
          </Stack>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 4 }}
            justifyContent="center"
            alignItems="center"
          >
            {benefits.map((benefit) => (
              <Box
                key={benefit}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <CheckCircle sx={{ fontSize: 18, color: alpha('#fff', 0.8) }} />
                <Typography
                  variant="body2"
                  sx={{ color: alpha('#fff', 0.8) }}
                >
                  {benefit}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default CTASection;
