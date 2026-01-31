import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  alpha,
  Chip,
} from '@mui/material';
import { Check, Close, Star } from '@mui/icons-material';

const PricingSection: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for testing with real clients',
      features: [
        { text: '2 active clients', included: true },
        { text: 'All core features', included: true },
        { text: 'Project hub & approvals', included: true },
        { text: 'Payment tracking', included: true },
        { text: '"Powered by FlowLance" badge', included: true },
        { text: 'Unlimited clients', included: false },
        { text: 'Custom branding', included: false },
        { text: 'Priority support', included: false },
      ],
      buttonText: 'Start Free',
      buttonVariant: 'outlined' as const,
      popular: false,
    },
    {
      name: 'Pro',
      price: '$15',
      period: '/month',
      description: 'For freelancers ready to scale',
      features: [
        { text: 'Unlimited clients', included: true },
        { text: 'All core features', included: true },
        { text: 'Remove FlowLance badge', included: true },
        { text: 'Custom branding & colors', included: true },
        { text: 'Custom portal URL', included: true },
        { text: 'Priority email support', included: true },
        { text: 'Export all data', included: true },
        { text: 'Early access to new features', included: true },
      ],
      buttonText: 'Start Free Trial',
      buttonVariant: 'contained' as const,
      popular: true,
    },
    {
      name: 'Agency',
      price: '$39',
      period: '/month',
      description: 'For teams with multiple designers',
      features: [
        { text: 'Everything in Pro', included: true },
        { text: 'Up to 5 team members', included: true },
        { text: 'Team permissions', included: true },
        { text: 'Client sub-accounts', included: true },
        { text: 'White-label domain', included: true },
        { text: 'Priority chat support', included: true },
        { text: 'Advanced analytics', included: true },
        { text: 'Onboarding call', included: true },
      ],
      buttonText: 'Contact Sales',
      buttonVariant: 'outlined' as const,
      popular: false,
    },
  ];

  return (
    <Box
      id="pricing"
      sx={{
        py: { xs: 10, md: 14 },
        backgroundColor: theme.palette.grey[50],
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decoration */}
      <Box
        sx={{
          position: 'absolute',
          top: '-30%',
          right: '-10%',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.05)} 0%, transparent 70%)`,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
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
            Simple pricing
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: '2rem', md: '2.75rem' },
            }}
          >
            Start free, upgrade when ready
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
            No credit card required. No hidden fees. Cancel anytime.
          </Typography>
        </Box>

        {/* Pricing Cards */}
        <Grid container spacing={4} justifyContent="center">
          {plans.map((plan, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  border: plan.popular
                    ? `2px solid ${theme.palette.primary.main}`
                    : `1px solid ${theme.palette.divider}`,
                  transition: 'all 0.3s ease-in-out',
                  transform: plan.popular ? { md: 'scale(1.05)' } : 'none',
                  zIndex: plan.popular ? 2 : 1,
                  '&:hover': {
                    transform: plan.popular
                      ? { md: 'scale(1.08)' }
                      : 'translateY(-8px)',
                    boxShadow: `0 20px 40px ${alpha(theme.palette.grey[900], 0.15)}`,
                  },
                }}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -12,
                      left: '50%',
                      transform: 'translateX(-50%)',
                    }}
                  >
                    <Chip
                      icon={<Star sx={{ fontSize: 16 }} />}
                      label="Most Popular"
                      color="primary"
                      size="small"
                      sx={{
                        fontWeight: 600,
                        px: 1,
                        '& .MuiChip-icon': {
                          color: 'inherit',
                        },
                      }}
                    />
                  </Box>
                )}

                <CardContent sx={{ p: 4, flex: 1, display: 'flex', flexDirection: 'column' }}>
                  {/* Plan Name */}
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: plan.popular ? 'primary.main' : 'text.primary',
                      mb: 1,
                    }}
                  >
                    {plan.name}
                  </Typography>

                  {/* Price */}
                  <Box sx={{ mb: 1 }}>
                    <Typography
                      component="span"
                      sx={{
                        fontSize: '3rem',
                        fontWeight: 800,
                        lineHeight: 1,
                      }}
                    >
                      {plan.price}
                    </Typography>
                    <Typography
                      component="span"
                      sx={{
                        color: 'text.secondary',
                        fontSize: '1rem',
                      }}
                    >
                      {plan.period}
                    </Typography>
                  </Box>

                  {/* Description */}
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      mb: 4,
                    }}
                  >
                    {plan.description}
                  </Typography>

                  {/* Features List */}
                  <List disablePadding sx={{ mb: 4, flex: 1 }}>
                    {plan.features.map((feature, i) => (
                      <ListItem
                        key={i}
                        disablePadding
                        sx={{ mb: 1.5 }}
                      >
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          {feature.included ? (
                            <Check sx={{ fontSize: 20, color: 'success.main' }} />
                          ) : (
                            <Close sx={{ fontSize: 20, color: 'grey.400' }} />
                          )}
                        </ListItemIcon>
                        <ListItemText
                          primary={feature.text}
                          primaryTypographyProps={{
                            variant: 'body2',
                            color: feature.included ? 'text.primary' : 'text.disabled',
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>

                  {/* CTA Button */}
                  <Button
                    variant={plan.buttonVariant}
                    size="large"
                    fullWidth
                    onClick={() => navigate('/signup')}
                    sx={{
                      py: 1.5,
                      ...(plan.popular && {
                        boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
                      }),
                    }}
                  >
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Money-back guarantee */}
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
            }}
          >
            <Check sx={{ color: 'success.main' }} />
            14-day free trial on Pro plan. No credit card required.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default PricingSection;
