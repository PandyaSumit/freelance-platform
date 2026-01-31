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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { Visibility, VisibilityOff, Google, Apple } from '@mui/icons-material';
import { useFormik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { signupSchema, SignupFormValues } from '../../utils/validationSchemas';
import { useAuth } from '../../context/AuthContext';

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const freelanceCategories = [
    { value: 'design', label: 'Design (UI/UX, Graphic, Web)' },
    { value: 'development', label: 'Development (Web, Mobile, Software)' },
    { value: 'writing', label: 'Writing (Content, Copy, Technical)' },
    { value: 'consulting', label: 'Consulting (Business, Strategy)' },
    { value: 'marketing', label: 'Marketing (Digital, Social, SEO)' },
    { value: 'other', label: 'Other' },
  ];

  const formik = useFormik<SignupFormValues>({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      freelanceCategory: '' as any,
      agreeToTerms: false as any,
    },
    validationSchema: toFormikValidationSchema(signupSchema),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setError(null);
        await signup({
          fullName: values.fullName,
          email: values.email,
          password: values.password,
          freelanceCategory: values.freelanceCategory,
        });
        navigate('/dashboard');
      } catch (err) {
        setError('Unable to create account. Please try again.');
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
          Create your account
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Start your 14-day free trial. No credit card required.
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

      {/* Signup Form */}
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <TextField
            fullWidth
            id="fullName"
            name="fullName"
            label="Full name"
            placeholder="John Anderson"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
            helperText={formik.touched.fullName && formik.errors.fullName}
            autoComplete="name"
            autoFocus
          />

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
          />

          <FormControl
            fullWidth
            error={formik.touched.freelanceCategory && Boolean(formik.errors.freelanceCategory)}
          >
            <InputLabel id="freelanceCategory-label">What do you freelance in?</InputLabel>
            <Select
              labelId="freelanceCategory-label"
              id="freelanceCategory"
              name="freelanceCategory"
              value={formik.values.freelanceCategory}
              label="What do you freelance in?"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              {freelanceCategories.map((category) => (
                <MenuItem key={category.value} value={category.value}>
                  {category.label}
                </MenuItem>
              ))}
            </Select>
            {formik.touched.freelanceCategory && formik.errors.freelanceCategory && (
              <FormHelperText>{formik.errors.freelanceCategory}</FormHelperText>
            )}
          </FormControl>

          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Create a strong password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            autoComplete="new-password"
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

          <TextField
            fullWidth
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm password"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm your password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            autoComplete="new-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                    size="small"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Terms Checkbox */}
          <FormControl
            error={formik.touched.agreeToTerms && Boolean(formik.errors.agreeToTerms)}
          >
            <FormControlLabel
              control={
                <Checkbox
                  id="agreeToTerms"
                  name="agreeToTerms"
                  checked={formik.values.agreeToTerms}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              }
              label={
                <Typography variant="body2" color="text.secondary">
                  I agree to the{' '}
                  <Link to="/terms" style={{ color: 'inherit' }}>
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" style={{ color: 'inherit' }}>
                    Privacy Policy
                  </Link>
                </Typography>
              }
            />
            {formik.touched.agreeToTerms && formik.errors.agreeToTerms && (
              <FormHelperText>{formik.errors.agreeToTerms}</FormHelperText>
            )}
          </FormControl>

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
              'Create account'
            )}
          </Button>
        </Box>
      </form>

      {/* Sign In Link */}
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Already have an account?{' '}
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

export default SignupPage;
