import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Typography, Button, Divider } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { Logo } from '../../components/common';

const PrivacyPage: React.FC = () => {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Container maxWidth="md">
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Logo size="medium" />
            </Link>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Button startIcon={<ArrowBack />}>Back to Home</Button>
            </Link>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="h3" fontWeight={700} gutterBottom>
          Privacy Policy
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Last updated: January 31, 2026
        </Typography>

        <Divider sx={{ mb: 4 }} />

        <Box sx={{ '& h5': { mt: 4, mb: 2 }, '& p': { mb: 2, lineHeight: 1.8, color: 'text.secondary' } }}>
          <Typography variant="h5" fontWeight={600}>1. Information We Collect</Typography>
          <Typography>
            We collect information you provide directly to us, such as when you create an account,
            use our services, or contact us for support. This includes your name, email address,
            and any other information you choose to provide.
          </Typography>

          <Typography variant="h5" fontWeight={600}>2. How We Use Your Information</Typography>
          <Typography>
            We use the information we collect to provide, maintain, and improve our services,
            to process transactions, send you technical notices and support messages, and to
            respond to your comments and questions.
          </Typography>

          <Typography variant="h5" fontWeight={600}>3. Information Sharing</Typography>
          <Typography>
            We do not share your personal information with third parties except as described in
            this policy. We may share information with vendors, consultants, and other service
            providers who need access to such information to carry out work on our behalf.
          </Typography>

          <Typography variant="h5" fontWeight={600}>4. Data Security</Typography>
          <Typography>
            We take reasonable measures to help protect your personal information from loss,
            theft, misuse, unauthorized access, disclosure, alteration, and destruction.
          </Typography>

          <Typography variant="h5" fontWeight={600}>5. Your Rights</Typography>
          <Typography>
            You may access, update, or delete your account information at any time by logging
            into your account settings. You may also contact us to request access to, correction
            of, or deletion of any personal information.
          </Typography>

          <Typography variant="h5" fontWeight={600}>6. Contact Us</Typography>
          <Typography>
            If you have any questions about this Privacy Policy, please contact us at
            privacy@flowlance.com.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default PrivacyPage;
