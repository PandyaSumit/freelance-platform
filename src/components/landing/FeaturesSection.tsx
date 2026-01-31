import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Share,
  ThumbUpAlt,
  Receipt,
  Star,
  CheckCircle,
} from '@mui/icons-material';

const FeaturesSection: React.FC = () => {
  const theme = useTheme();

  const mainFeatures = [
    {
      icon: Share,
      title: 'Smart Project Hub',
      subtitle: 'One link per client',
      description: 'Share all deliverables through a single, professional link. Clients see everything in one place - no more "where\'s that file?" messages.',
      benefits: [
        'Upload files with notes',
        'Client gets email notifications',
        'Organized by project',
      ],
      color: theme.palette.primary.main,
      gradient: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
    },
    {
      icon: ThumbUpAlt,
      title: 'Visual Approval Workflow',
      subtitle: 'Get sign-off in 2 clicks',
      description: 'Clients click "Approve" or "Request Changes" directly on deliverables. No more chasing approvals or unclear feedback.',
      benefits: [
        'Big, clear action buttons',
        'Feedback attached to items',
        'Traffic light status system',
      ],
      color: theme.palette.success.main,
      gradient: `linear-gradient(135deg, ${theme.palette.success.main} 0%, ${theme.palette.success.dark} 100%)`,
    },
    {
      icon: Receipt,
      title: 'Payment Tracker',
      subtitle: 'Know who owes what',
      description: 'Track payment milestones, generate PDF invoices, and send polite reminders with one click. End payment chaos forever.',
      benefits: [
        'One-click invoice generation',
        'Track: Sent → Viewed → Paid',
        'Automated payment reminders',
      ],
      color: theme.palette.warning.main,
      gradient: `linear-gradient(135deg, ${theme.palette.warning.main} 0%, ${theme.palette.warning.dark} 100%)`,
    },
  ];

  const bonusFeature = {
    icon: Star,
    title: 'Client Testimonial Collector',
    subtitle: 'Your secret weapon',
    description: 'After project delivery, automatically prompt clients for feedback. Build your social proof while you sleep.',
    benefits: [
      'Auto-request after project completion',
      'Star ratings + written testimonials',
      'Export to PDF or embed on portfolio',
    ],
    color: '#8B5CF6',
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)',
  };

  return (
    <Box
      id="features"
      sx={{
        py: { xs: 10, md: 14 },
        position: 'relative',
        backgroundColor: 'background.default',
      }}
    >
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 10 } }}>
          <Typography
            variant="overline"
            sx={{
              color: 'primary.main',
              fontWeight: 600,
              letterSpacing: 2,
              mb: 2,
              display: 'block',
            }}
          >
            Everything you need
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: '2rem', md: '2.75rem' },
            }}
          >
            Three features. Zero chaos.
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'text.secondary',
              maxWidth: 600,
              mx: 'auto',
              fontWeight: 400,
            }}
          >
            We do 3 things exceptionally well, not 10 things poorly. Everything you need to look professional and save hours every week.
          </Typography>
        </Box>

        {/* Main Features */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {mainFeatures.map((feature, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <Card
                sx={{
                  height: '100%',
                  border: `1px solid ${theme.palette.divider}`,
                  transition: 'all 0.3s ease-in-out',
                  overflow: 'visible',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 20px 40px ${alpha(feature.color, 0.15)}`,
                    borderColor: alpha(feature.color, 0.3),
                  },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  {/* Icon */}
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: 3,
                      background: feature.gradient,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                      boxShadow: `0 8px 20px ${alpha(feature.color, 0.3)}`,
                    }}
                  >
                    <feature.icon sx={{ fontSize: 32, color: 'white' }} />
                  </Box>

                  {/* Content */}
                  <Typography
                    variant="caption"
                    sx={{
                      color: feature.color,
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: 1,
                    }}
                  >
                    {feature.subtitle}
                  </Typography>

                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      mb: 2,
                      mt: 0.5,
                    }}
                  >
                    {feature.title}
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      color: 'text.secondary',
                      mb: 3,
                      lineHeight: 1.7,
                    }}
                  >
                    {feature.description}
                  </Typography>

                  {/* Benefits */}
                  <Box>
                    {feature.benefits.map((benefit, i) => (
                      <Box
                        key={i}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1.5,
                          mb: 1.5,
                        }}
                      >
                        <CheckCircle
                          sx={{
                            fontSize: 18,
                            color: feature.color,
                          }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {benefit}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Bonus Feature - Testimonial Collector */}
        <Box
          sx={{
            mt: 8,
            p: { xs: 4, md: 6 },
            borderRadius: 4,
            background: `linear-gradient(135deg, ${alpha(bonusFeature.color, 0.05)} 0%, ${alpha(bonusFeature.color, 0.02)} 100%)`,
            border: `1px solid ${alpha(bonusFeature.color, 0.2)}`,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Badge */}
          <Box
            sx={{
              position: 'absolute',
              top: 24,
              right: 24,
              px: 2,
              py: 0.5,
              borderRadius: 2,
              backgroundColor: alpha(bonusFeature.color, 0.15),
            }}
          >
            <Typography
              variant="caption"
              sx={{ color: bonusFeature.color, fontWeight: 600 }}
            >
              SECRET WEAPON
            </Typography>
          </Box>

          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: 4,
                  background: bonusFeature.gradient,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 3,
                  boxShadow: `0 12px 30px ${alpha(bonusFeature.color, 0.3)}`,
                }}
              >
                <bonusFeature.icon sx={{ fontSize: 40, color: 'white' }} />
              </Box>

              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                }}
              >
                {bonusFeature.title}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  mb: 3,
                  lineHeight: 1.7,
                  fontSize: '1.1rem',
                }}
              >
                {bonusFeature.description}
              </Typography>

              <Box>
                {bonusFeature.benefits.map((benefit, i) => (
                  <Box
                    key={i}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      mb: 1.5,
                    }}
                  >
                    <CheckCircle
                      sx={{
                        fontSize: 20,
                        color: bonusFeature.color,
                      }}
                    />
                    <Typography variant="body1" color="text.secondary">
                      {benefit}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              {/* Testimonial Preview Card */}
              <Box
                sx={{
                  backgroundColor: 'white',
                  borderRadius: 3,
                  p: 4,
                  boxShadow: `0 20px 40px ${alpha(theme.palette.grey[900], 0.1)}`,
                  border: `1px solid ${theme.palette.divider}`,
                }}
              >
                <Box sx={{ display: 'flex', gap: 0.5, mb: 2 }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} sx={{ fontSize: 24, color: '#FBBF24' }} />
                  ))}
                </Box>

                <Typography
                  variant="body1"
                  sx={{
                    fontStyle: 'italic',
                    color: 'text.primary',
                    mb: 3,
                    lineHeight: 1.8,
                  }}
                >
                  "John delivered exactly what we needed for our brand. The logo perfectly captures our startup's energy and vision. Communication was excellent!"
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 600,
                      color: 'primary.main',
                    }}
                  >
                    MC
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Michael Chen
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      CEO, StartupXYZ
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default FeaturesSection;
