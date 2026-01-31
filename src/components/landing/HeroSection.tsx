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
  Chip,
} from '@mui/material';
import { PlayArrow, ArrowForward, CheckCircle } from '@mui/icons-material';

const HeroSection: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const benefits = [
    'No credit card required',
    'Free forever plan',
    'Setup in 2 minutes',
  ];

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        pt: { xs: 8, md: 12 },
        pb: { xs: 10, md: 16 },
      }}
    >
      {/* Background Gradient */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse 80% 50% at 50% -20%, ${alpha(theme.palette.primary.main, 0.15)}, transparent)`,
        }}
      />

      {/* Decorative Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(theme.palette.primary.light, 0.1)} 0%, transparent 70%)`,
          filter: 'blur(40px)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '10%',
          right: '10%',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(theme.palette.success.light, 0.08)} 0%, transparent 70%)`,
          filter: 'blur(40px)',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ textAlign: 'center', maxWidth: 900, mx: 'auto' }}>
          {/* Badge */}
          <Chip
            label="Now in public beta"
            color="primary"
            variant="outlined"
            size="small"
            sx={{
              mb: 3,
              px: 1,
              backgroundColor: alpha(theme.palette.primary.main, 0.08),
              borderColor: alpha(theme.palette.primary.main, 0.3),
              fontWeight: 500,
            }}
          />

          {/* Main Headline */}
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
              fontWeight: 800,
              lineHeight: 1.1,
              mb: 3,
              background: `linear-gradient(135deg, ${theme.palette.text.primary} 0%, ${theme.palette.grey[700]} 100%)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Stop Chasing Clients.
            <br />
            <Box
              component="span"
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Start Looking Professional.
            </Box>
          </Typography>

          {/* Subheadline */}
          <Typography
            variant="h5"
            sx={{
              color: 'text.secondary',
              fontWeight: 400,
              mb: 5,
              maxWidth: 700,
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            The client portal that organizes your projects, tracks payments, and gets you approvals faster.
            Look like an agency, even if you're a team of one.
          </Typography>

          {/* CTA Buttons */}
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
                px: 4,
                py: 1.75,
                fontSize: '1.1rem',
                boxShadow: `0 8px 30px ${alpha(theme.palette.primary.main, 0.4)}`,
                '&:hover': {
                  boxShadow: `0 12px 40px ${alpha(theme.palette.primary.main, 0.5)}`,
                },
              }}
            >
              Start Free Trial
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<PlayArrow />}
              sx={{
                px: 4,
                py: 1.75,
                fontSize: '1.1rem',
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                },
              }}
            >
              Watch Demo
            </Button>
          </Stack>

          {/* Benefits */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 3 }}
            justifyContent="center"
            alignItems="center"
          >
            {benefits.map((benefit) => (
              <Box
                key={benefit}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.75,
                }}
              >
                <CheckCircle sx={{ fontSize: 18, color: 'success.main' }} />
                <Typography variant="body2" color="text.secondary">
                  {benefit}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>

        {/* Hero Image/Dashboard Preview */}
        <Box
          sx={{
            mt: { xs: 8, md: 10 },
            position: 'relative',
          }}
        >
          {/* Browser Frame */}
          <Box
            sx={{
              borderRadius: 4,
              overflow: 'hidden',
              boxShadow: `0 25px 50px -12px ${alpha(theme.palette.grey[900], 0.25)}`,
              border: `1px solid ${theme.palette.divider}`,
              backgroundColor: 'background.paper',
            }}
          >
            {/* Browser Top Bar */}
            <Box
              sx={{
                height: 48,
                backgroundColor: theme.palette.grey[100],
                borderBottom: `1px solid ${theme.palette.divider}`,
                display: 'flex',
                alignItems: 'center',
                px: 2,
                gap: 1.5,
              }}
            >
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#FF5F57' }} />
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#FFBD2E' }} />
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#28CA41' }} />
              </Box>
              <Box
                sx={{
                  flex: 1,
                  maxWidth: 400,
                  mx: 'auto',
                  height: 28,
                  borderRadius: 1.5,
                  backgroundColor: 'white',
                  border: `1px solid ${theme.palette.grey[300]}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="caption" color="text.secondary">
                  flowlance.com/dashboard
                </Typography>
              </Box>
            </Box>

            {/* Dashboard Preview Image */}
            <Box
              sx={{
                aspectRatio: '16/9',
                backgroundColor: theme.palette.grey[50],
                background: `linear-gradient(180deg, ${theme.palette.grey[50]} 0%, ${theme.palette.grey[100]} 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Placeholder Dashboard UI */}
              <Box sx={{ width: '100%', height: '100%', display: 'flex' }}>
                {/* Sidebar */}
                <Box
                  sx={{
                    width: 200,
                    backgroundColor: 'white',
                    borderRight: `1px solid ${theme.palette.divider}`,
                    p: 2,
                    display: { xs: 'none', sm: 'block' },
                  }}
                >
                  <Box sx={{ height: 32, width: 120, borderRadius: 1, backgroundColor: theme.palette.grey[200], mb: 3 }} />
                  {[1, 2, 3, 4].map((i) => (
                    <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                      <Box sx={{ width: 20, height: 20, borderRadius: 1, backgroundColor: i === 1 ? alpha(theme.palette.primary.main, 0.2) : theme.palette.grey[200] }} />
                      <Box sx={{ height: 12, width: 80, borderRadius: 1, backgroundColor: i === 1 ? alpha(theme.palette.primary.main, 0.2) : theme.palette.grey[200] }} />
                    </Box>
                  ))}
                </Box>

                {/* Main Content */}
                <Box sx={{ flex: 1, p: { xs: 2, sm: 3 } }}>
                  {/* Stats Cards */}
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' }, gap: 2, mb: 3 }}>
                    {[
                      { label: 'Active Projects', value: '5', color: theme.palette.primary.main },
                      { label: 'Pending Approvals', value: '3', color: theme.palette.warning.main },
                      { label: 'Unpaid Invoices', value: '$1,250', color: theme.palette.error.main },
                      { label: 'This Month', value: '$4,200', color: theme.palette.success.main },
                    ].map((stat, i) => (
                      <Box
                        key={i}
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          backgroundColor: 'white',
                          border: `1px solid ${theme.palette.divider}`,
                        }}
                      >
                        <Box sx={{ height: 8, width: 60, borderRadius: 1, backgroundColor: theme.palette.grey[200], mb: 1 }} />
                        <Typography variant="h5" fontWeight={700} sx={{ color: stat.color }}>
                          {stat.value}
                        </Typography>
                      </Box>
                    ))}
                  </Box>

                  {/* Projects Table */}
                  <Box
                    sx={{
                      borderRadius: 2,
                      backgroundColor: 'white',
                      border: `1px solid ${theme.palette.divider}`,
                      overflow: 'hidden',
                    }}
                  >
                    <Box sx={{ height: 48, borderBottom: `1px solid ${theme.palette.divider}`, display: 'flex', alignItems: 'center', px: 2, justifyContent: 'space-between' }}>
                      <Box sx={{ height: 14, width: 100, borderRadius: 1, backgroundColor: theme.palette.grey[200] }} />
                      <Box sx={{ height: 32, width: 100, borderRadius: 1.5, backgroundColor: alpha(theme.palette.primary.main, 0.1) }} />
                    </Box>
                    {[1, 2, 3].map((i) => (
                      <Box
                        key={i}
                        sx={{
                          height: 64,
                          borderBottom: i < 3 ? `1px solid ${theme.palette.divider}` : 'none',
                          display: 'flex',
                          alignItems: 'center',
                          px: 2,
                          gap: 2,
                        }}
                      >
                        <Box sx={{ width: 40, height: 40, borderRadius: 2, backgroundColor: theme.palette.grey[200] }} />
                        <Box sx={{ flex: 1 }}>
                          <Box sx={{ height: 12, width: 150, borderRadius: 1, backgroundColor: theme.palette.grey[200], mb: 0.5 }} />
                          <Box sx={{ height: 10, width: 100, borderRadius: 1, backgroundColor: theme.palette.grey[100] }} />
                        </Box>
                        <Box sx={{ height: 24, width: 80, borderRadius: 3, backgroundColor: i === 1 ? alpha(theme.palette.warning.main, 0.15) : i === 2 ? alpha(theme.palette.success.main, 0.15) : alpha(theme.palette.info.main, 0.15) }} />
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Floating Elements */}
          <Box
            sx={{
              position: 'absolute',
              top: { xs: -20, md: 40 },
              left: { xs: -10, md: -40 },
              p: 2,
              borderRadius: 3,
              backgroundColor: 'white',
              boxShadow: `0 10px 40px ${alpha(theme.palette.grey[900], 0.15)}`,
              border: `1px solid ${theme.palette.divider}`,
              display: { xs: 'none', sm: 'flex' },
              alignItems: 'center',
              gap: 1.5,
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                backgroundColor: alpha(theme.palette.success.main, 0.1),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CheckCircle sx={{ color: 'success.main' }} />
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                Design Approved!
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Sarah approved your work
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              position: 'absolute',
              bottom: { xs: -20, md: 60 },
              right: { xs: -10, md: -30 },
              p: 2,
              borderRadius: 3,
              backgroundColor: 'white',
              boxShadow: `0 10px 40px ${alpha(theme.palette.grey[900], 0.15)}`,
              border: `1px solid ${theme.palette.divider}`,
              display: { xs: 'none', sm: 'block' },
            }}
          >
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
              Payment Received
            </Typography>
            <Typography variant="h6" fontWeight={700} color="success.main">
              +$1,500.00
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
