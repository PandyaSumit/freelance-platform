import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Typography, Button, Divider } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { Logo } from '../../components/common';

const TermsPage: React.FC = () => {
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
          Terms of Service
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Last updated: January 31, 2026
        </Typography>

        <Divider sx={{ mb: 4 }} />

        <Box sx={{ '& h5': { mt: 4, mb: 2 }, '& p': { mb: 2, lineHeight: 1.8, color: 'text.secondary' } }}>
          <Typography variant="h5" fontWeight={600}>1. Acceptance of Terms</Typography>
          <Typography>
            By accessing or using FlowLance, you agree to be bound by these Terms of Service.
            If you do not agree to these terms, please do not use our services.
          </Typography>

          <Typography variant="h5" fontWeight={600}>2. Description of Service</Typography>
          <Typography>
            FlowLance provides a client portal platform for freelancers to manage projects,
            share deliverables, track payments, and collect client feedback. We reserve the
            right to modify, suspend, or discontinue the service at any time.
          </Typography>

          <Typography variant="h5" fontWeight={600}>3. User Accounts</Typography>
          <Typography>
            You are responsible for maintaining the confidentiality of your account credentials
            and for all activities that occur under your account. You agree to notify us
            immediately of any unauthorized use of your account.
          </Typography>

          <Typography variant="h5" fontWeight={600}>4. Acceptable Use</Typography>
          <Typography>
            You agree not to use the service for any unlawful purpose or in any way that could
            damage, disable, or impair the service. You may not attempt to gain unauthorized
            access to any part of the service.
          </Typography>

          <Typography variant="h5" fontWeight={600}>5. Payment Terms</Typography>
          <Typography>
            Paid subscriptions are billed in advance on a monthly or annual basis. All payments
            are non-refundable except as required by law. You may cancel your subscription at
            any time, and cancellation will take effect at the end of the current billing period.
          </Typography>

          <Typography variant="h5" fontWeight={600}>6. Intellectual Property</Typography>
          <Typography>
            You retain all rights to the content you upload to FlowLance. By using our service,
            you grant us a limited license to store and display your content as necessary to
            provide the service.
          </Typography>

          <Typography variant="h5" fontWeight={600}>7. Limitation of Liability</Typography>
          <Typography>
            FlowLance shall not be liable for any indirect, incidental, special, consequential,
            or punitive damages resulting from your use of or inability to use the service.
          </Typography>

          <Typography variant="h5" fontWeight={600}>8. Contact</Typography>
          <Typography>
            If you have any questions about these Terms, please contact us at legal@flowlance.com.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default TermsPage;
