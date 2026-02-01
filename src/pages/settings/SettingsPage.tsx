import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Tabs,
  Tab,
  TextField,
  Button,
  Switch,
  Grid,
  Divider,
  useTheme,
  alpha,
  Avatar,
  IconButton,
  Chip,
} from '@mui/material';
import { CameraAlt, ContentCopy } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { currentUser } from '../../data/mockData';
import { UserRole } from '../../types';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => (
  <Box role="tabpanel" hidden={value !== index}>
    {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
  </Box>
);

// Role-based settings configuration
interface SettingsTab {
  label: string;
  key: string;
}

// MVP: 2 roles only (Freelancer + Client)
const roleTabsConfig: Record<UserRole, SettingsTab[]> = {
  freelancer: [
    { label: 'Profile', key: 'profile' },
    { label: 'Branding', key: 'branding' },
    { label: 'Notifications', key: 'notifications' },
    { label: 'Billing', key: 'billing' },
  ],
  client: [
    { label: 'Profile', key: 'profile' },
    { label: 'Notifications', key: 'notifications' },
  ],
};

const rolePageConfig: Record<UserRole, {
  title: string;
  subtitle: string;
  canEditProfile: boolean;
}> = {
  freelancer: {
    title: 'Settings',
    subtitle: 'Manage your account and preferences',
    canEditProfile: true,
  },
  client: {
    title: 'Account Settings',
    subtitle: 'Manage your profile and notifications',
    canEditProfile: true,
  },
};

const SettingsPage: React.FC = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const userRole = user?.role || 'freelancer';
  const tabs = roleTabsConfig[userRole];
  const pageConfig = rolePageConfig[userRole];

  const [tabValue, setTabValue] = useState(0);
  const [brandColor, setBrandColor] = useState('#4F46E5');

  const [notifications, setNotifications] = useState({
    emailOnApproval: true,
    emailOnPaymentViewed: true,
    emailOnChangesRequested: true,
    weeklySummary: true,
  });

  // Get current tab key
  const currentTabKey = tabs[tabValue]?.key || 'profile';

  // Different notification options per role
  const freelancerNotifications = [
    { key: 'emailOnApproval', label: 'When a client approves work', description: 'Get notified when deliverables are approved' },
    { key: 'emailOnPaymentViewed', label: 'When an invoice is viewed', description: 'Know when clients see your invoices' },
    { key: 'emailOnChangesRequested', label: 'When changes are requested', description: 'Get feedback notifications instantly' },
    { key: 'weeklySummary', label: 'Weekly summary', description: 'Receive a weekly digest of all activity' },
  ];

  const clientNotifications = [
    { key: 'emailOnApproval', label: 'Deliverable ready for review', description: 'Get notified when new work is uploaded' },
    { key: 'emailOnPaymentViewed', label: 'Invoice reminders', description: 'Receive payment due reminders' },
    { key: 'weeklySummary', label: 'Weekly project updates', description: 'Receive a weekly summary of project progress' },
  ];

  const getNotificationOptions = () => {
    return userRole === 'client' ? clientNotifications : freelancerNotifications;
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          {pageConfig.title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {pageConfig.subtitle}
        </Typography>
      </Box>

      {/* Settings Card */}
      <Card>
        <Box sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}>
          <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)}>
            {tabs.map((tab) => (
              <Tab key={tab.key} label={tab.label} />
            ))}
          </Tabs>
        </Box>

        <CardContent sx={{ p: 4 }}>
          {/* Profile Tab */}
          {currentTabKey === 'profile' && (
            <Box sx={{ maxWidth: 600 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Profile Information
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                {pageConfig.canEditProfile
                  ? 'Update your personal details and information.'
                  : 'View your profile information.'}
              </Typography>

              {/* Avatar */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4 }}>
                <Box sx={{ position: 'relative' }}>
                  <Avatar sx={{ width: 80, height: 80, fontSize: '2rem', bgcolor: 'primary.main' }}>
                    {user?.fullName?.charAt(0) || 'U'}
                  </Avatar>
                  {pageConfig.canEditProfile && (
                    <IconButton
                      size="small"
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        backgroundColor: 'background.paper',
                        border: `2px solid ${theme.palette.divider}`,
                        '&:hover': { backgroundColor: 'grey.100' },
                      }}
                    >
                      <CameraAlt fontSize="small" />
                    </IconButton>
                  )}
                </Box>
                <Box>
                  <Typography variant="subtitle1" fontWeight={600}>{user?.fullName}</Typography>
                  <Typography variant="body2" color="text.secondary">{user?.email}</Typography>
                  <Chip
                    label={userRole.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())}
                    size="small"
                    sx={{ mt: 0.5 }}
                  />
                </Box>
              </Box>

              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    defaultValue={user?.fullName}
                    disabled={!pageConfig.canEditProfile}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Email"
                    defaultValue={user?.email}
                    type="email"
                    disabled={!pageConfig.canEditProfile}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Phone"
                    placeholder="+1 (555) 123-4567"
                    disabled={!pageConfig.canEditProfile}
                  />
                </Grid>
                {userRole === 'freelancer' && (
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Business Name"
                      defaultValue={user?.businessName || currentUser.businessName}
                      disabled={!pageConfig.canEditProfile}
                    />
                  </Grid>
                )}
                {userRole === 'client' && (
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Company"
                      defaultValue={user?.company || 'TechCorp Inc.'}
                      disabled={!pageConfig.canEditProfile}
                    />
                  </Grid>
                )}
              </Grid>

              {pageConfig.canEditProfile && (
                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button variant="contained">Save Changes</Button>
                </Box>
              )}
            </Box>
          )}

          {/* Branding Tab - Only for freelancer */}
          {currentTabKey === 'branding' && userRole === 'freelancer' && (
            <Box sx={{ maxWidth: 600 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Box>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    Branding
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Customize how your client portal looks.
                  </Typography>
                </Box>
                <Chip label="Pro Feature" color="primary" size="small" />
              </Box>

              {/* Logo Upload */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                  Logo
                </Typography>
                <Box
                  sx={{
                    width: 200,
                    height: 100,
                    border: `2px dashed ${theme.palette.divider}`,
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    '&:hover': { borderColor: 'primary.main', backgroundColor: alpha(theme.palette.primary.main, 0.04) },
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Click to upload
                  </Typography>
                </Box>
              </Box>

              {/* Brand Color */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                  Brand Color
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      backgroundColor: brandColor,
                      cursor: 'pointer',
                      border: `2px solid ${theme.palette.divider}`,
                    }}
                  />
                  <TextField
                    size="small"
                    value={brandColor}
                    onChange={(e) => setBrandColor(e.target.value)}
                    sx={{ width: 120 }}
                  />
                </Box>
              </Box>

              {/* Portal URL */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                  Portal URL
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TextField
                    size="small"
                    defaultValue={currentUser.portalSubdomain}
                    InputProps={{
                      startAdornment: <Typography sx={{ color: 'text.secondary', mr: 0.5 }}>flowlance.com/</Typography>,
                    }}
                    sx={{ width: 300 }}
                  />
                  <IconButton size="small"><ContentCopy fontSize="small" /></IconButton>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="contained">Save Changes</Button>
              </Box>
            </Box>
          )}

          {/* Notifications Tab */}
          {currentTabKey === 'notifications' && (
            <Box sx={{ maxWidth: 600 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Email Notifications
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                Choose what emails you'd like to receive.
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {getNotificationOptions().map((item) => (
                  <Box
                    key={item.key}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      p: 2,
                      borderRadius: 2,
                      border: `1px solid ${theme.palette.divider}`,
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle2" fontWeight={600}>{item.label}</Typography>
                      <Typography variant="body2" color="text.secondary">{item.description}</Typography>
                    </Box>
                    <Switch
                      checked={notifications[item.key as keyof typeof notifications] ?? true}
                      onChange={(e) => setNotifications({ ...notifications, [item.key]: e.target.checked })}
                    />
                  </Box>
                ))}
              </Box>

              <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="contained">Save Preferences</Button>
              </Box>
            </Box>
          )}

          {/* Billing Tab - Only for freelancer */}
          {currentTabKey === 'billing' && userRole === 'freelancer' && (
            <Box sx={{ maxWidth: 600 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Subscription
              </Typography>

              <Box
                sx={{
                  p: 3,
                  borderRadius: 3,
                  border: `2px solid ${theme.palette.primary.main}`,
                  backgroundColor: alpha(theme.palette.primary.main, 0.04),
                  mb: 4,
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Box>
                    <Chip label="Current Plan" color="primary" size="small" sx={{ mb: 1 }} />
                    <Typography variant="h5" fontWeight={700}>Pro Plan</Typography>
                  </Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="h4" fontWeight={700}>$15</Typography>
                    <Typography variant="body2" color="text.secondary">/month</Typography>
                  </Box>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Unlimited clients, custom branding, priority support
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Next billing date: February 28, 2026
                  </Typography>
                  <Button variant="outlined" size="small">
                    Manage Subscription
                  </Button>
                </Box>
              </Box>

              <Typography variant="h6" fontWeight={600} gutterBottom>
                Payment Method
              </Typography>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  border: `1px solid ${theme.palette.divider}`,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ p: 1, borderRadius: 1, backgroundColor: 'grey.100' }}>💳</Box>
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600}>Visa ending in 4242</Typography>
                    <Typography variant="body2" color="text.secondary">Expires 12/2027</Typography>
                  </Box>
                </Box>
                <Button size="small">Update</Button>
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default SettingsPage;
