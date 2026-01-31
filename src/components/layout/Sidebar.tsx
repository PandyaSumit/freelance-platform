import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  useTheme,
  useMediaQuery,
  alpha,
  IconButton,
  Chip,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  FolderOpen,
  People,
  Receipt,
  Settings,
  Close,
  Stars,
  RateReview,
  Visibility,
} from '@mui/icons-material';
import { Logo } from '../common';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

const DRAWER_WIDTH = 260;

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

// Role badge configuration
const roleBadgeConfig: Record<UserRole, { label: string; color: string }> = {
  freelancer: { label: 'Owner', color: '#6366F1' },
  client: { label: 'Client', color: '#10B981' },
  team_member: { label: 'Team', color: '#F59E0B' },
  client_sub_user: { label: 'Reviewer', color: '#8B5CF6' },
};

// Menu items with role-based access
interface MenuItem {
  label: string;
  icon: React.ElementType;
  path: string;
  roles: UserRole[];
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { sidebarOpen } = useApp();
  const { user } = useAuth();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const userRole = user?.role || 'freelancer';

  // Define menu items with role-based access
  const allMenuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: DashboardIcon,
      path: '/dashboard',
      roles: ['freelancer', 'client', 'team_member', 'client_sub_user'],
    },
    {
      label: 'Projects',
      icon: FolderOpen,
      path: '/projects',
      roles: ['freelancer', 'client', 'team_member', 'client_sub_user'],
    },
    {
      label: 'Clients',
      icon: People,
      path: '/clients',
      roles: ['freelancer', 'team_member'],
    },
    {
      label: 'Invoices',
      icon: Receipt,
      path: '/invoices',
      roles: ['freelancer', 'client', 'team_member', 'client_sub_user'],
    },
    {
      label: 'Approvals',
      icon: RateReview,
      path: '/projects?filter=pending',
      roles: ['client'],
    },
  ];

  const allSecondaryItems: MenuItem[] = [
    {
      label: 'Settings',
      icon: Settings,
      path: '/settings',
      roles: ['freelancer', 'client', 'team_member'],
    },
    {
      label: 'View Only',
      icon: Visibility,
      path: '/settings',
      roles: ['client_sub_user'],
    },
  ];

  // Filter menu items based on user role
  const menuItems = allMenuItems.filter((item) => item.roles.includes(userRole));
  const secondaryItems = allSecondaryItems.filter((item) => item.roles.includes(userRole));

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) onClose();
  };

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard' || location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const drawerContent = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: 'background.paper',
      }}
    >
      {/* Logo Section */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2.5,
          py: 2,
          minHeight: 64,
        }}
      >
        <Box onClick={() => navigate('/dashboard')} sx={{ cursor: 'pointer' }}>
          <Logo size="medium" />
        </Box>
        {isMobile && (
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        )}
      </Box>

      {/* Role Badge */}
      <Box sx={{ px: 2.5, pb: 1 }}>
        <Chip
          label={roleBadgeConfig[userRole].label}
          size="small"
          sx={{
            backgroundColor: alpha(roleBadgeConfig[userRole].color, 0.1),
            color: roleBadgeConfig[userRole].color,
            fontWeight: 600,
            fontSize: '0.75rem',
          }}
        />
      </Box>

      <Divider sx={{ mx: 2 }} />

      {/* Main Navigation */}
      <Box sx={{ flex: 1, px: 2, py: 2 }}>
        <List disablePadding>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.path}
              selected={isActive(item.path)}
              onClick={() => handleNavigation(item.path)}
              sx={{
                mb: 0.5,
                borderRadius: 2,
                '&.Mui-selected': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.08),
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.12),
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'primary.main',
                  },
                  '& .MuiListItemText-primary': {
                    color: 'primary.main',
                    fontWeight: 600,
                  },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: 'text.secondary' }}>
                <item.icon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: '0.9375rem',
                  fontWeight: 500,
                }}
              />
            </ListItemButton>
          ))}
        </List>

        <Divider sx={{ my: 2 }} />

        <List disablePadding>
          {secondaryItems.map((item) => (
            <ListItemButton
              key={item.path}
              selected={isActive(item.path)}
              onClick={() => handleNavigation(item.path)}
              sx={{
                mb: 0.5,
                borderRadius: 2,
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: 'text.secondary' }}>
                <item.icon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: '0.9375rem',
                  fontWeight: 500,
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </Box>

      {/* Pro Features Promo - Only for freelancers */}
      {userRole === 'freelancer' && (
        <Box sx={{ px: 2, pb: 2 }}>
          <Box
            sx={{
              p: 2.5,
              borderRadius: 3,
              background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.primary.light, 0.05)} 100%)`,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Stars sx={{ fontSize: 18, color: 'primary.main' }} />
              <Typography variant="subtitle2" fontWeight={600} color="primary.main">
                Pro Plan
              </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
              Unlimited clients, custom branding & more
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: 'primary.main',
                fontWeight: 600,
                cursor: 'pointer',
                '&:hover': { textDecoration: 'underline' },
              }}
              onClick={() => navigate('/settings/billing')}
            >
              Upgrade now →
            </Typography>
          </Box>
        </Box>
      )}

      {/* Client Portal Info - For clients */}
      {(userRole === 'client' || userRole === 'client_sub_user') && (
        <Box sx={{ px: 2, pb: 2 }}>
          <Box
            sx={{
              p: 2.5,
              borderRadius: 3,
              background: `linear-gradient(135deg, ${alpha('#10B981', 0.1)} 0%, ${alpha('#10B981', 0.05)} 100%)`,
              border: `1px solid ${alpha('#10B981', 0.1)}`,
            }}
          >
            <Typography variant="subtitle2" fontWeight={600} sx={{ color: '#10B981', mb: 0.5 }}>
              Client Portal
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
              You're viewing as a client. Review deliverables and manage payments here.
            </Typography>
          </Box>
        </Box>
      )}

      {/* Team Member Info */}
      {userRole === 'team_member' && (
        <Box sx={{ px: 2, pb: 2 }}>
          <Box
            sx={{
              p: 2.5,
              borderRadius: 3,
              background: `linear-gradient(135deg, ${alpha('#F59E0B', 0.1)} 0%, ${alpha('#F59E0B', 0.05)} 100%)`,
              border: `1px solid ${alpha('#F59E0B', 0.1)}`,
            }}
          >
            <Typography variant="subtitle2" fontWeight={600} sx={{ color: '#F59E0B', mb: 0.5 }}>
              Team Access
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
              You have team member access. Contact the owner for full permissions.
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );

  // Mobile drawer
  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            borderRight: 'none',
            boxShadow: theme.shadows[4],
          },
        }}
      >
        {drawerContent}
      </Drawer>
    );
  }

  // Desktop drawer
  return (
    <Drawer
      variant="persistent"
      open={sidebarOpen}
      sx={{
        width: sidebarOpen ? DRAWER_WIDTH : 0,
        flexShrink: 0,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          borderRight: `1px solid ${theme.palette.divider}`,
          transition: theme.transitions.create('transform', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          transform: sidebarOpen ? 'translateX(0)' : `translateX(-${DRAWER_WIDTH}px)`,
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
};

export default Sidebar;
