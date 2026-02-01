import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  Grid,
  alpha,
  useTheme,
  Chip,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Google,
  Apple,
  Person,
  Business,
  ContentCopy,
  CheckCircle,
} from '@mui/icons-material';
import { useFormik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { loginSchema, LoginFormValues } from '../../utils/validationSchemas';
import { useAuth, DEMO_USERS } from '../../context/AuthContext';
import { UserRole } from '../../types';

// Role configuration for demo cards - MVP: 2 roles only
const roleConfig: Record<UserRole, {
  label: string;
  description: string;
  icon: React.ReactElement;
  color: string;
  features: string[];
}> = {
  freelancer: {
    label: 'Freelancer',
    description: 'Full platform access',
    icon: <Person />,
    color: '#6366F1',
    features: ['Create projects', 'Manage clients', 'Send invoices', 'Full dashboard'],
  },
  client: {
    label: 'Client',
    description: 'View & approve work',
    icon: <Business />,
    color: '#10B981',
    features: ['View projects', 'Approve deliverables', 'Pay invoices', 'Leave feedback'],
  },
};

const LoginPage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedRole, setCopiedRole] = useState<UserRole | null>(null);

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: toFormikValidationSchema(loginSchema),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setError(null);
        await login(values.email, values.password);
        navigate('/dashboard');
      } catch (err) {
        setError('Invalid email or password. Please try again.');
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Quick login with demo credentials
  const handleDemoLogin = async (role: UserRole) => {
    const demoUser = DEMO_USERS[role];
    formik.setValues({ email: demoUser.email, password: demoUser.password });
    try {
      setError(null);
      await login(demoUser.email, demoUser.password);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to login with demo credentials.');
    }
  };

  // Copy credentials to clipboard
  const handleCopyCredentials = (role: UserRole, e: React.MouseEvent) => {
    e.stopPropagation();
    const demoUser = DEMO_USERS[role];
    navigator.clipboard.writeText(`${demoUser.email} / ${demoUser.password}`);
    setCopiedRole(role);
    setTimeout(() => setCopiedRole(null), 2000);
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4, textAlign: { xs: 'center', md: 'left' } }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Welcome back
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Enter your credentials to access your account
        </Typography>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Social Login Buttons */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Button
          variant="outlined"
          fullWidth
          startIcon={<Google />}
          sx={{
            py: 1.25,
            borderColor: 'grey.300',
            color: 'text.primary',
            '&:hover': {
              borderColor: 'grey.400',
              backgroundColor: 'grey.50',
            },
          }}
        >
          Google
        </Button>
        <Button
          variant="outlined"
          fullWidth
          startIcon={<Apple />}
          sx={{
            py: 1.25,
            borderColor: 'grey.300',
            color: 'text.primary',
            '&:hover': {
              borderColor: 'grey.400',
              backgroundColor: 'grey.50',
            },
          }}
        >
          Apple
        </Button>
      </Box>

      {/* Divider */}
      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" color="text.secondary">
          or continue with email
        </Typography>
      </Divider>

      {/* Login Form */}
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email address"
            placeholder="you@example.com"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            autoComplete="email"
            autoFocus
          />

          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            autoComplete="current-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    size="small"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Forgot Password Link */}
          <Box sx={{ textAlign: 'right', mt: -1 }}>
            <Link
              to="/forgot-password"
              style={{ textDecoration: 'none' }}
            >
              <Typography
                variant="body2"
                color="primary"
                sx={{
                  fontWeight: 500,
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                Forgot password?
              </Typography>
            </Link>
          </Box>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={formik.isSubmitting}
            sx={{ py: 1.5, mt: 1 }}
          >
            {formik.isSubmitting ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Sign in'
            )}
          </Button>
        </Box>
      </form>

      {/* Sign Up Link */}
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Don't have an account?{' '}
          <Link
            to="/signup"
            style={{ textDecoration: 'none' }}
          >
            <Typography
              component="span"
              variant="body2"
              color="primary"
              sx={{
                fontWeight: 600,
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              Create one now
            </Typography>
          </Link>
        </Typography>
      </Box>

      {/* Demo Credentials Section */}
      <Box sx={{ mt: 4 }}>
        <Divider sx={{ mb: 3 }}>
          <Chip
            label="Quick Demo Access"
            size="small"
            sx={{
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
              color: 'primary.main',
              fontWeight: 600,
            }}
          />
        </Divider>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2, textAlign: 'center' }}
        >
          Click any role card to instantly login and explore the platform
        </Typography>

        <Grid container spacing={2}>
          {(Object.keys(roleConfig) as UserRole[]).map((role) => {
            const config = roleConfig[role];
            const demoUser = DEMO_USERS[role];
            const isCopied = copiedRole === role;

            return (
              <Grid size={{ xs: 12, sm: 6 }} key={role}>
                <Card
                  sx={{
                    cursor: 'pointer',
                    transition: 'all 0.2s ease-in-out',
                    border: '1px solid',
                    borderColor: 'grey.200',
                    position: 'relative',
                    overflow: 'visible',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: `0 8px 24px ${alpha(config.color, 0.25)}`,
                      borderColor: config.color,
                      '& .role-icon': {
                        transform: 'scale(1.1)',
                        backgroundColor: config.color,
                        color: '#fff',
                      },
                    },
                  }}
                  onClick={() => handleDemoLogin(role)}
                >
                  {/* Copy Button */}
                  <IconButton
                    size="small"
                    onClick={(e) => handleCopyCredentials(role, e)}
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      zIndex: 1,
                      backgroundColor: 'background.paper',
                      boxShadow: 1,
                      '&:hover': {
                        backgroundColor: alpha(config.color, 0.1),
                      },
                    }}
                  >
                    {isCopied ? (
                      <CheckCircle sx={{ fontSize: 16, color: 'success.main' }} />
                    ) : (
                      <ContentCopy sx={{ fontSize: 16, color: 'text.secondary' }} />
                    )}
                  </IconButton>

                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      {/* Role Icon */}
                      <Box
                        className="role-icon"
                        sx={{
                          width: 44,
                          height: 44,
                          borderRadius: 2,
                          backgroundColor: alpha(config.color, 0.1),
                          color: config.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.2s ease-in-out',
                          flexShrink: 0,
                        }}
                      >
                        {config.icon}
                      </Box>

                      {/* Role Info */}
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography variant="subtitle2" fontWeight={700} gutterBottom>
                          {config.label}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ display: 'block', mb: 1 }}
                        >
                          {config.description}
                        </Typography>

                        {/* Credentials */}
                        <Box
                          sx={{
                            backgroundColor: 'grey.50',
                            borderRadius: 1,
                            p: 1,
                            mt: 1,
                          }}
                        >
                          <Typography
                            variant="caption"
                            fontFamily="monospace"
                            sx={{
                              display: 'block',
                              color: 'text.secondary',
                              fontSize: '0.7rem',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {demoUser.email}
                          </Typography>
                          <Typography
                            variant="caption"
                            fontFamily="monospace"
                            sx={{
                              color: 'text.secondary',
                              fontSize: '0.7rem',
                            }}
                          >
                            Password: {demoUser.password}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    {/* Features Preview */}
                    <Box
                      sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 0.5,
                        mt: 1.5,
                      }}
                    >
                      {config.features.slice(0, 3).map((feature, idx) => (
                        <Chip
                          key={idx}
                          label={feature}
                          size="small"
                          sx={{
                            height: 20,
                            fontSize: '0.65rem',
                            backgroundColor: alpha(config.color, 0.08),
                            color: config.color,
                            fontWeight: 500,
                          }}
                        />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
};

export default LoginPage;
