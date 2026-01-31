import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Box,
  Typography,
  Divider,
  Avatar,
  ListItemIcon,
  ListItemText,
  useTheme,
  alpha,
  Tooltip,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Person,
  Settings,
  Logout,
  CheckCircle,
  Error as ErrorIcon,
  AttachMoney,
} from '@mui/icons-material';
import { SearchInput, UserAvatar, Logo } from '../common';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { formatRelativeTime } from '../../utils/helpers';

const DRAWER_WIDTH = 260;

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { notifications, unreadCount, markNotificationRead, markAllNotificationsRead, sidebarOpen } = useApp();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationAnchor, setNotificationAnchor] = useState<null | HTMLElement>(null);

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
    navigate('/');
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'deliverable_approved':
        return <CheckCircle sx={{ color: 'success.main', fontSize: 20 }} />;
      case 'changes_requested':
        return <ErrorIcon sx={{ color: 'warning.main', fontSize: 20 }} />;
      case 'invoice_paid':
        return <AttachMoney sx={{ color: 'success.main', fontSize: 20 }} />;
      default:
        return <NotificationsIcon sx={{ color: 'primary.main', fontSize: 20 }} />;
    }
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: alpha(theme.palette.background.paper, 0.8),
        backdropFilter: 'blur(8px)',
        borderBottom: `1px solid ${theme.palette.divider}`,
        width: { md: sidebarOpen ? `calc(100% - ${DRAWER_WIDTH}px)` : '100%' },
        ml: { md: sidebarOpen ? `${DRAWER_WIDTH}px` : 0 },
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }}
    >
      <Toolbar sx={{ gap: 2 }}>
        <IconButton
          edge="start"
          onClick={onMenuClick}
          sx={{ color: 'text.primary' }}
        >
          <MenuIcon />
        </IconButton>

        {isMobile && <Logo size="small" />}

        {/* Search - Hidden on mobile */}
        <Box sx={{ display: { xs: 'none', sm: 'block' }, flexGrow: 1, maxWidth: 400 }}>
          <SearchInput
            placeholder="Search projects or clients..."
            fullWidth
          />
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        {/* Notifications */}
        <Tooltip title="Notifications">
          <IconButton
            onClick={handleNotificationClick}
            sx={{ color: 'text.primary' }}
          >
            <Badge badgeContent={unreadCount} color="error" max={9}>
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Tooltip>

        {/* Profile */}
        <Box
          onClick={handleProfileClick}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            cursor: 'pointer',
            p: 0.5,
            pr: 1.5,
            borderRadius: 2,
            '&:hover': {
              backgroundColor: 'grey.100',
            },
          }}
        >
          <UserAvatar
            name={user?.fullName || 'User'}
            size="small"
          />
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Typography variant="body2" fontWeight={600} color="text.primary">
              {user?.fullName || 'User'}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Pro Plan
            </Typography>
          </Box>
        </Box>

        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          PaperProps={{
            sx: {
              width: 220,
              mt: 1,
            },
          }}
        >
          <Box sx={{ px: 2, py: 1.5 }}>
            <Typography variant="subtitle2" fontWeight={600}>
              {user?.fullName}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {user?.email}
            </Typography>
          </Box>
          <Divider />
          <MenuItem onClick={() => { handleClose(); navigate('/settings'); }}>
            <ListItemIcon>
              <Person fontSize="small" />
            </ListItemIcon>
            <ListItemText>Profile</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => { handleClose(); navigate('/settings'); }}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            <ListItemText>Settings</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            <ListItemText>Log out</ListItemText>
          </MenuItem>
        </Menu>

        {/* Notifications Menu */}
        <Menu
          anchorEl={notificationAnchor}
          open={Boolean(notificationAnchor)}
          onClose={handleNotificationClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          PaperProps={{
            sx: {
              width: 360,
              maxHeight: 480,
              mt: 1,
            },
          }}
        >
          <Box
            sx={{
              px: 2,
              py: 1.5,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="subtitle1" fontWeight={600}>
              Notifications
            </Typography>
            {unreadCount > 0 && (
              <Typography
                variant="caption"
                sx={{
                  color: 'primary.main',
                  cursor: 'pointer',
                  '&:hover': { textDecoration: 'underline' },
                }}
                onClick={() => {
                  markAllNotificationsRead();
                }}
              >
                Mark all as read
              </Typography>
            )}
          </Box>
          <Divider />
          {notifications.length === 0 ? (
            <Box sx={{ py: 4, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                No notifications yet
              </Typography>
            </Box>
          ) : (
            notifications.slice(0, 5).map((notification) => (
              <MenuItem
                key={notification.id}
                onClick={() => {
                  markNotificationRead(notification.id);
                  if (notification.actionUrl) {
                    navigate(notification.actionUrl);
                  }
                  handleNotificationClose();
                }}
                sx={{
                  py: 1.5,
                  px: 2,
                  alignItems: 'flex-start',
                  backgroundColor: notification.read ? 'transparent' : alpha(theme.palette.primary.main, 0.04),
                }}
              >
                <Box sx={{ mr: 1.5, mt: 0.5 }}>
                  {getNotificationIcon(notification.type)}
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    variant="body2"
                    fontWeight={notification.read ? 400 : 600}
                    sx={{ mb: 0.25 }}
                  >
                    {notification.title}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      display: 'block',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {notification.message}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {formatRelativeTime(notification.createdAt)}
                  </Typography>
                </Box>
              </MenuItem>
            ))
          )}
          {notifications.length > 5 && (
            <>
              <Divider />
              <MenuItem
                onClick={() => {
                  handleNotificationClose();
                  navigate('/notifications');
                }}
                sx={{ justifyContent: 'center', py: 1.5 }}
              >
                <Typography variant="body2" color="primary.main" fontWeight={500}>
                  View all notifications
                </Typography>
              </MenuItem>
            </>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
