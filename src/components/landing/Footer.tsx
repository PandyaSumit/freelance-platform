import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  IconButton,
  useTheme,
  alpha,
  Divider,
} from '@mui/material';
import { Twitter, YouTube, LinkedIn, GitHub } from '@mui/icons-material';
import { Logo } from '../common';

const Footer: React.FC = () => {
  const theme = useTheme();

  const footerLinks = {
    Product: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Changelog', href: '/changelog' },
    ],
    Company: [
      { label: 'About', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
    ],
    Resources: [
      { label: 'Help Center', href: '/help' },
      { label: 'Templates', href: '/templates' },
      { label: 'Guides', href: '/guides' },
      { label: 'API Docs', href: '/api' },
    ],
    Legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com/flowlance', label: 'Twitter' },
    { icon: YouTube, href: 'https://youtube.com/flowlance', label: 'YouTube' },
    { icon: LinkedIn, href: 'https://linkedin.com/company/flowlance', label: 'LinkedIn' },
    { icon: GitHub, href: 'https://github.com/flowlance', label: 'GitHub' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.grey[900],
        color: 'white',
        pt: { xs: 8, md: 10 },
        pb: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Brand Column */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ mb: 3 }}>
              <Logo color="white" size="medium" />
            </Box>
            <Typography
              variant="body2"
              sx={{
                color: alpha('#fff', 0.7),
                mb: 3,
                maxWidth: 300,
                lineHeight: 1.7,
              }}
            >
              The client portal that makes freelancers look like agencies. Share work, track payments, and get approvals faster.
            </Typography>

            {/* Social Links */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              {socialLinks.map((social) => (
                <IconButton
                  key={social.label}
                  component="a"
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  sx={{
                    color: alpha('#fff', 0.6),
                    '&:hover': {
                      color: 'white',
                      backgroundColor: alpha('#fff', 0.1),
                    },
                  }}
                >
                  <social.icon fontSize="small" />
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <Grid size={{ xs: 6, sm: 3, md: 2 }} key={category}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  color: 'white',
                }}
              >
                {category}
              </Typography>
              <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                {links.map((link) => (
                  <Box component="li" key={link.label} sx={{ mb: 1.5 }}>
                    {link.href.startsWith('#') ? (
                      <Typography
                        component="a"
                        href={link.href}
                        sx={{
                          color: alpha('#fff', 0.6),
                          textDecoration: 'none',
                          fontSize: '0.875rem',
                          transition: 'color 0.2s',
                          '&:hover': {
                            color: 'white',
                          },
                        }}
                      >
                        {link.label}
                      </Typography>
                    ) : (
                      <Link
                        to={link.href}
                        style={{
                          color: alpha('#fff', 0.6),
                          textDecoration: 'none',
                          fontSize: '0.875rem',
                        }}
                      >
                        {link.label}
                      </Link>
                    )}
                  </Box>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 6, borderColor: alpha('#fff', 0.1) }} />

        {/* Bottom Bar */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: alpha('#fff', 0.5) }}
          >
            © 2026 FlowLance. All rights reserved.
          </Typography>

          <Typography
            variant="body2"
            sx={{ color: alpha('#fff', 0.5) }}
          >
            Made with care for freelancers everywhere
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
