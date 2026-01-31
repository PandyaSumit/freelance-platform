import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from '@mui/material';
import { ArrowBack, CheckCircle } from '@mui/icons-material';
import { useFormik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { forgotPasswordSchema, ForgotPasswordFormValues } from '../../utils/validationSchemas';

const ForgotPasswordPage: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formik = useFormik<ForgotPasswordFormValues>({
    initialValues: {
      email: '',
    },
    validationSchema: toFormikValidationSchema(forgotPasswordSchema),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setError(null);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsSubmitted(true);
      } catch (err) {
        setError('Unable to send reset email. Please try again.');
      } finally {
        setSubmitting(false);
      }
    },
  });

  if (isSubmitted) {
    return (
      <Box sx={{ textAlign: 'center' }}>
        {/* Success Icon */}
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            backgroundColor: 'success.light',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 3,
          }}
        >
          <CheckCircle sx={{ fontSize: 40, color: 'success.main' }} />
        </Box>

        <Typography variant="h4" fontWeight={700} gutterBottom>
          Check your email
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 4, maxWidth: 400, mx: 'auto' }}
        >
          We've sent a password reset link to{' '}
          <Typography component="span" fontWeight={600} color="text.primary">
            {formik.values.email}
          </Typography>
          . Click the link to reset your password.
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          Didn't receive the email? Check your spam folder or{' '}
          <Typography
            component="span"
            color="primary"
            sx={{
              fontWeight: 500,
              cursor: 'pointer',
              '&:hover': { textDecoration: 'underline' },
            }}
            onClick={() => setIsSubmitted(false)}
          >
            try again
          </Typography>
        </Typography>

        <Link to="/login" style={{ textDecoration: 'none' }}>
          <Button
            variant="text"
            startIcon={<ArrowBack />}
          >
            Back to sign in
          </Button>
        </Link>
      </Box>
    );
  }

  return (
    <Box>
      {/* Back Link */}
      <Link to="/login" style={{ textDecoration: 'none' }}>
        <Button
          variant="text"
          startIcon={<ArrowBack />}
          sx={{ mb: 3, ml: -1 }}
        >
          Back to sign in
        </Button>
      </Link>

      {/* Header */}
      <Box sx={{ mb: 4, textAlign: { xs: 'center', md: 'left' } }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Reset your password
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Enter your email address and we'll send you a link to reset your password.
        </Typography>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Forgot Password Form */}
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
              'Send reset link'
            )}
          </Button>
        </Box>
      </form>

      {/* Help Text */}
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Remember your password?{' '}
          <Link
            to="/login"
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
              Sign in
            </Typography>
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default ForgotPasswordPage;
