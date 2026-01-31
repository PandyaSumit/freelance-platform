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
  FolderOff,
  MoneyOff,
  PhoneInTalk,
} from '@mui/icons-material';

const ProblemSection: React.FC = () => {
  const theme = useTheme();

  const problems = [
    {
      icon: FolderOff,
      title: 'Files scattered everywhere',
      description: "WhatsApp, email, Drive, Dropbox... your deliverables are all over the place. Clients can't find anything, and neither can you.",
      emoji: '😫',
    },
    {
      icon: MoneyOff,
      title: 'Chasing payments like a job',
      description: "Sending awkward reminder emails, losing track of who owes what. Payment follow-ups shouldn't take hours every week.",
      emoji: '💸',
    },
    {
      icon: PhoneInTalk,
      title: '"What\'s the status?" messages',
      description: 'Clients keep asking for updates. You waste time responding instead of doing actual work. There has to be a better way.',
      emoji: '📱',
    },
  ];

  return (
    <Box
      sx={{
        py: { xs: 10, md: 14 },
        backgroundColor: theme.palette.grey[50],
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(${theme.palette.grey[200]} 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
          opacity: 0.5,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          <Typography
            variant="overline"
            sx={{
              color: 'error.main',
              fontWeight: 600,
              letterSpacing: 2,
              mb: 2,
              display: 'block',
            }}
          >
            Sound familiar?
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: '2rem', md: '2.75rem' },
            }}
          >
            Freelancing shouldn't feel this chaotic
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
            You're great at your craft. But managing clients? That's a whole different story.
          </Typography>
        </Box>

        {/* Problem Cards */}
        <Grid container spacing={4}>
          {problems.map((problem, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <Card
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  p: 1,
                  backgroundColor: 'white',
                  border: `1px solid ${theme.palette.divider}`,
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 20px 40px ${alpha(theme.palette.grey[900], 0.1)}`,
                  },
                }}
              >
                <CardContent sx={{ py: 4, px: 3 }}>
                  {/* Emoji */}
                  <Typography
                    sx={{
                      fontSize: '3rem',
                      mb: 2,
                      display: 'block',
                    }}
                  >
                    {problem.emoji}
                  </Typography>

                  {/* Icon */}
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: 3,
                      backgroundColor: alpha(theme.palette.error.main, 0.08),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 3,
                    }}
                  >
                    <problem.icon
                      sx={{
                        fontSize: 32,
                        color: 'error.main',
                      }}
                    />
                  </Box>

                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 600,
                      mb: 2,
                    }}
                  >
                    {problem.title}
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      color: 'text.secondary',
                      lineHeight: 1.7,
                    }}
                  >
                    {problem.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Bottom Text */}
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              color: 'text.primary',
            }}
          >
            There's a better way to work.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default ProblemSection;
