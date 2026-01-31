import { z } from 'zod';

// Login schema
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

// Signup schema
export const signupSchema = z
  .object({
    fullName: z
      .string()
      .min(1, 'Full name is required')
      .min(2, 'Name must be at least 2 characters')
      .max(100, 'Name must be less than 100 characters'),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Please enter a valid email address'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must be at least 8 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Password must contain at least one uppercase letter, one lowercase letter, and one number'
      ),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    freelanceCategory: z.enum(['design', 'development', 'writing', 'consulting', 'marketing', 'other'], {
      message: 'Please select your freelance category',
    }),
    agreeToTerms: z.boolean().refine((val) => val === true, {
      message: 'You must agree to the terms and conditions',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type SignupFormValues = z.infer<typeof signupSchema>;

// Forgot password schema
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

// Reset password schema
export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must be at least 8 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Password must contain at least one uppercase letter, one lowercase letter, and one number'
      ),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

// Create project schema
export const createProjectSchema = z.object({
  name: z
    .string()
    .min(1, 'Project name is required')
    .min(3, 'Project name must be at least 3 characters')
    .max(100, 'Project name must be less than 100 characters'),
  description: z
    .string()
    .max(500, 'Description must be less than 500 characters')
    .optional(),
  clientEmail: z
    .string()
    .min(1, 'Client email is required')
    .email('Please enter a valid email address'),
  clientName: z
    .string()
    .min(1, 'Client name is required')
    .min(2, 'Client name must be at least 2 characters')
    .max(100, 'Client name must be less than 100 characters'),
});

export type CreateProjectFormValues = z.infer<typeof createProjectSchema>;

// Upload deliverable schema
export const uploadDeliverableSchema = z.object({
  note: z
    .string()
    .max(500, 'Note must be less than 500 characters')
    .optional(),
});

export type UploadDeliverableFormValues = z.infer<typeof uploadDeliverableSchema>;

// Create invoice schema
export const createInvoiceSchema = z.object({
  description: z
    .string()
    .min(1, 'Description is required')
    .min(5, 'Description must be at least 5 characters')
    .max(200, 'Description must be less than 200 characters'),
  amount: z
    .number({ message: 'Please enter a valid amount' })
    .min(1, 'Amount must be at least $1')
    .max(1000000, 'Amount must be less than $1,000,000'),
  dueDate: z.string().min(1, 'Due date is required'),
});

export type CreateInvoiceFormValues = z.infer<typeof createInvoiceSchema>;

// Client feedback schema
export const clientFeedbackSchema = z.object({
  feedback: z
    .string()
    .min(1, 'Please describe what needs to change')
    .min(10, 'Please provide more detail (at least 10 characters)')
    .max(1000, 'Feedback must be less than 1000 characters'),
});

export type ClientFeedbackFormValues = z.infer<typeof clientFeedbackSchema>;

// Profile settings schema
export const profileSettingsSchema = z.object({
  fullName: z
    .string()
    .min(1, 'Full name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  phone: z
    .string()
    .regex(/^$|^\+?[\d\s\-()]+$/, 'Please enter a valid phone number')
    .optional()
    .or(z.literal('')),
  businessName: z
    .string()
    .max(100, 'Business name must be less than 100 characters')
    .optional()
    .or(z.literal('')),
});

export type ProfileSettingsFormValues = z.infer<typeof profileSettingsSchema>;

// Branding settings schema
export const brandingSettingsSchema = z.object({
  brandColor: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, 'Please enter a valid hex color'),
  portalUrl: z
    .string()
    .min(1, 'Portal URL is required')
    .min(3, 'URL must be at least 3 characters')
    .max(50, 'URL must be less than 50 characters')
    .regex(
      /^[a-z0-9-]+$/,
      'URL can only contain lowercase letters, numbers, and hyphens'
    ),
});

export type BrandingSettingsFormValues = z.infer<typeof brandingSettingsSchema>;

// Add client schema
export const addClientSchema = z.object({
  name: z
    .string()
    .min(1, 'Client name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  company: z
    .string()
    .max(100, 'Company name must be less than 100 characters')
    .optional()
    .or(z.literal('')),
  phone: z
    .string()
    .regex(/^$|^\+?[\d\s\-()]+$/, 'Please enter a valid phone number')
    .optional()
    .or(z.literal('')),
});

export type AddClientFormValues = z.infer<typeof addClientSchema>;

// Testimonial request schema
export const testimonialSchema = z.object({
  rating: z.number().min(1).max(5),
  text: z
    .string()
    .min(1, 'Please share your feedback')
    .min(20, 'Please provide at least 20 characters')
    .max(500, 'Feedback must be less than 500 characters'),
  canDisplay: z.boolean(),
});

export type TestimonialFormValues = z.infer<typeof testimonialSchema>;

// Contact form schema (for landing page)
export const contactSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  message: z
    .string()
    .min(1, 'Message is required')
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
