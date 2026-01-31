import React from 'react';
import { Box } from '@mui/material';
import {
  Navbar,
  HeroSection,
  ProblemSection,
  FeaturesSection,
  PricingSection,
  FAQSection,
  CTASection,
  Footer,
} from '../../components/landing';

const LandingPage: React.FC = () => {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <FeaturesSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </Box>
  );
};

export default LandingPage;
