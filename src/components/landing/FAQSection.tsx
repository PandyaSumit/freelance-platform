import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
  alpha,
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

const FAQSection: React.FC = () => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState<string | false>('panel1');

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const faqs = [
    {
      id: 'panel1',
      question: 'Do my clients need to create an account?',
      answer: 'No! Your clients receive a unique link to their project portal. They can view deliverables, approve work, and leave feedback without creating an account. If they want to log in again later, they can optionally set a password. We designed it to be grandma-level simple.',
    },
    {
      id: 'panel2',
      question: 'Can I use my own branding?',
      answer: 'Yes! On the Pro plan and above, you can upload your logo, set your brand colors, and even use a custom portal URL (like clients.yourbrand.com). Your clients will see your branding, not ours. On the Free plan, there\'s a small "Powered by FlowLance" badge.',
    },
    {
      id: 'panel3',
      question: 'What file types can I share?',
      answer: 'FlowLance supports all common file types including images (JPG, PNG, GIF, SVG), documents (PDF, DOC, XLS), design files (Figma, Sketch, PSD, AI), videos (MP4, MOV), and archives (ZIP, RAR). Each file can be up to 50MB on Free, 100MB on Pro, and 500MB on Agency.',
    },
    {
      id: 'panel4',
      question: 'How do clients pay me?',
      answer: 'FlowLance tracks your invoices and payment status, but we don\'t process payments directly. You continue using your preferred payment method (PayPal, Stripe, bank transfer, etc.). We help you track what\'s been sent, viewed, and paid, and send reminders when needed. This keeps things simple and doesn\'t add any extra fees.',
    },
    {
      id: 'panel5',
      question: 'Can I export my data?',
      answer: 'Absolutely. You own your data. Export all your projects, clients, invoices, and testimonials anytime in CSV or JSON format. We believe in data portability - if you ever decide to leave (we hope you won\'t!), you can take everything with you.',
    },
    {
      id: 'panel6',
      question: 'Is there a mobile app?',
      answer: 'The FlowLance platform is fully responsive and works great on mobile browsers. Your clients can approve work from their phones while waiting in line at Starbucks. We\'re considering native apps in the future, but the web experience is already optimized for mobile.',
    },
    {
      id: 'panel7',
      question: 'What happens when my trial ends?',
      answer: 'If you don\'t upgrade after your 14-day Pro trial, your account automatically converts to the Free plan. You keep all your data, but are limited to 2 active clients. You can upgrade to Pro anytime to unlock unlimited clients again.',
    },
  ];

  return (
    <Box
      id="faq"
      sx={{
        py: { xs: 10, md: 14 },
        backgroundColor: 'background.default',
      }}
    >
      <Container maxWidth="md">
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
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
            Got questions?
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: '2rem', md: '2.75rem' },
            }}
          >
            Frequently Asked Questions
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'text.secondary',
              fontWeight: 400,
            }}
          >
            Everything you need to know about FlowLance
          </Typography>
        </Box>

        {/* FAQ Accordions */}
        <Box>
          {faqs.map((faq) => (
            <Accordion
              key={faq.id}
              expanded={expanded === faq.id}
              onChange={handleChange(faq.id)}
              disableGutters
              elevation={0}
              sx={{
                mb: 2,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: '16px !important',
                overflow: 'hidden',
                '&:before': {
                  display: 'none',
                },
                '&.Mui-expanded': {
                  borderColor: theme.palette.primary.main,
                  boxShadow: `0 0 0 1px ${theme.palette.primary.main}`,
                },
              }}
            >
              <AccordionSummary
                expandIcon={
                  expanded === faq.id ? (
                    <Remove sx={{ color: 'primary.main' }} />
                  ) : (
                    <Add sx={{ color: 'text.secondary' }} />
                  )
                }
                sx={{
                  px: 3,
                  py: 1,
                  '&.Mui-expanded': {
                    minHeight: 'auto',
                  },
                  '& .MuiAccordionSummary-content': {
                    my: 2,
                  },
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    color: expanded === faq.id ? 'primary.main' : 'text.primary',
                  }}
                >
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  px: 3,
                  pb: 3,
                  pt: 0,
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.secondary',
                    lineHeight: 1.8,
                  }}
                >
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>

        {/* Contact CTA */}
        <Box
          sx={{
            mt: 8,
            p: 4,
            borderRadius: 4,
            backgroundColor: alpha(theme.palette.primary.main, 0.04),
            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Still have questions?
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Can't find the answer you're looking for? We're here to help.
          </Typography>
          <Typography
            component="a"
            href="mailto:support@flowlance.com"
            sx={{
              color: 'primary.main',
              fontWeight: 600,
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            Contact our support team →
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default FAQSection;
