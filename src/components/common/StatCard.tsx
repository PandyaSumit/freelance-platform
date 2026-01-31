import React from 'react';
import { Box, Card, Typography, alpha, useTheme } from '@mui/material';
import { SvgIconComponent } from '@mui/icons-material';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: SvgIconComponent;
  color?: 'primary' | 'success' | 'warning' | 'error' | 'info';
  trend?: {
    value: number;
    label: string;
  };
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  color = 'primary',
  trend,
}) => {
  const theme = useTheme();

  const colorMap = {
    primary: theme.palette.primary.main,
    success: theme.palette.success.main,
    warning: theme.palette.warning.main,
    error: theme.palette.error.main,
    info: theme.palette.info.main,
  };

  const bgColor = colorMap[color];

  return (
    <Card
      sx={{
        p: 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 3,
        },
      }}
    >
      {/* Background decoration */}
      <Box
        sx={{
          position: 'absolute',
          top: -20,
          right: -20,
          width: 120,
          height: 120,
          borderRadius: '50%',
          backgroundColor: alpha(bgColor, 0.08),
        }}
      />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 2,
            backgroundColor: alpha(bgColor, 0.1),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon sx={{ fontSize: 24, color: bgColor }} />
        </Box>

        {trend && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              px: 1,
              py: 0.5,
              borderRadius: 1,
              backgroundColor: trend.value >= 0 ? alpha(theme.palette.success.main, 0.1) : alpha(theme.palette.error.main, 0.1),
            }}
          >
            <Typography
              variant="caption"
              sx={{
                fontWeight: 600,
                color: trend.value >= 0 ? 'success.main' : 'error.main',
              }}
            >
              {trend.value >= 0 ? '+' : ''}{trend.value}%
            </Typography>
          </Box>
        )}
      </Box>

      <Typography
        variant="caption"
        sx={{
          color: 'text.secondary',
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          mb: 0.5,
        }}
      >
        {title}
      </Typography>

      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          color: 'text.primary',
          lineHeight: 1.2,
        }}
      >
        {value}
      </Typography>

      {subtitle && (
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            mt: 0.5,
          }}
        >
          {subtitle}
        </Typography>
      )}

      {trend && (
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            mt: 'auto',
            pt: 1,
          }}
        >
          {trend.label}
        </Typography>
      )}
    </Card>
  );
};

export default StatCard;
