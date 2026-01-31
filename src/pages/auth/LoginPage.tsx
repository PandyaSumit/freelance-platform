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
} from '@mui/material';
import { Visibility, VisibilityOff, Google, Apple } from '@mui/icons-material';
import { useFormik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { loginSchema, LoginFormValues } from '../../utils/validationSchemas';
import { useAuth } from '../../context/AuthContext';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

      {/* Demo Credentials */}
      <Box
        sx={{
          mt: 4,
          p: 2,
          borderRadius: 2,
          backgroundColor: 'grey.50',
          border: '1px solid',
          borderColor: 'grey.200',
        }}
      >
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
          Demo credentials (for testing):
        </Typography>
        <Typography variant="body2" fontFamily="monospace">
          Email: demo@flowlance.com
        </Typography>
        <Typography variant="body2" fontFamily="monospace">
          Password: Demo1234
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginPage;
