import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Tabs,
  Tab,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  alpha,
  LinearProgress,
  Alert,
} from '@mui/material';
import {
  Add,
  MoreVert,
  Visibility,
  Edit,
  Delete,
  Archive,
  ThumbUp,
  ThumbDown,
} from '@mui/icons-material';
import { SearchInput, UserAvatar, StatusBadge, EmptyState } from '../../components/common';
import { useAuth } from '../../context/AuthContext';
import { mockProjects } from '../../data/mockData';
import { formatCurrency, formatRelativeTime } from '../../utils/helpers';
import { ProjectStatus, UserRole } from '../../types';

// Role-based page configuration - MVP: 2 roles only (Freelancer + Client)
const pageConfig: Record<UserRole, {
  title: string;
  subtitle: string;
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canApprove: boolean;
  showPaymentProgress: boolean;
}> = {
  freelancer: {
    title: 'Projects',
    subtitle: 'Manage all your client projects in one place',
    canCreate: true,
    canEdit: true,
    canDelete: true,
    canApprove: false,
    showPaymentProgress: true,
  },
  client: {
    title: 'Your Projects',
    subtitle: 'Review deliverables and track project progress',
    canCreate: false,
    canEdit: false,
    canDelete: false,
    canApprove: true,
    showPaymentProgress: true,
  },
};

const ProjectsPage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user } = useAuth();
  const userRole = user?.role || 'freelancer';
  const config = pageConfig[userRole];

  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  // Different status filters for different roles
  const freelancerFilters: { label: string; value: ProjectStatus | 'all' }[] = [
    { label: 'All Projects', value: 'all' },
    { label: 'In Progress', value: 'in_progress' },
    { label: 'In Review', value: 'in_review' },
    { label: 'Approved', value: 'approved' },
    { label: 'Delivered', value: 'delivered' },
  ];

  const clientFilters: { label: string; value: ProjectStatus | 'all' }[] = [
    { label: 'All', value: 'all' },
    { label: 'Needs Review', value: 'in_review' },
    { label: 'In Progress', value: 'in_progress' },
    { label: 'Approved', value: 'approved' },
    { label: 'Delivered', value: 'delivered' },
  ];

  const statusFilters = userRole === 'client' ? clientFilters : freelancerFilters;

  const filteredProjects = mockProjects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.clientName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilters[tabValue].value === 'all' ||
      project.status === statusFilters[tabValue].value;
    return matchesSearch && matchesStatus;
  });

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, projectId: string) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedProjectId(projectId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedProjectId(null);
  };

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'stretch', sm: 'center' },
          gap: 2,
          mb: 4,
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            {config.title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {config.subtitle}
          </Typography>
        </Box>
        {config.canCreate && (
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => navigate('/projects/new')}
            sx={{ alignSelf: { xs: 'stretch', sm: 'auto' } }}
          >
            New Project
          </Button>
        )}
      </Box>

      {/* Role-specific alerts */}
      {userRole === 'client' && (
        <Alert severity="info" sx={{ mb: 3 }}>
          You have {mockProjects.filter(p => p.pendingApprovals > 0).length} projects with pending deliverables awaiting your review.
        </Alert>
      )}

      {/* Filters */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 2,
          mb: 3,
        }}
      >
        <SearchInput
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ width: { xs: '100%', md: 300 } }}
        />

        <Tabs
          value={tabValue}
          onChange={(e, newValue) => setTabValue(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            minHeight: 40,
            '& .MuiTab-root': {
              minHeight: 40,
              py: 1,
            },
          }}
        >
          {statusFilters.map((filter, index) => (
            <Tab
              key={filter.value}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {filter.label}
                  {filter.value !== 'all' && (
                    <Chip
                      label={mockProjects.filter((p) => p.status === filter.value).length}
                      size="small"
                      sx={{
                        height: 20,
                        fontSize: '0.75rem',
                        backgroundColor: tabValue === index ? 'primary.main' : 'grey.200',
                        color: tabValue === index ? 'white' : 'text.secondary',
                      }}
                    />
                  )}
                </Box>
              }
            />
          ))}
        </Tabs>
      </Box>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <EmptyState
          title="No projects found"
          description={
            searchQuery
              ? `No projects match "${searchQuery}". Try a different search.`
              : config.canCreate
              ? 'Create your first project to get started.'
              : 'No projects have been shared with you yet.'
          }
          action={
            !searchQuery && config.canCreate
              ? { label: 'Create Project', onClick: () => navigate('/projects/new') }
              : undefined
          }
        />
      ) : (
        <Grid container spacing={3}>
          {filteredProjects.map((project) => {
            const progressPercent = project.totalValue > 0
              ? Math.round((project.paidAmount / project.totalValue) * 100)
              : 0;

            return (
              <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={project.id}>
                <Card
                  sx={{
                    height: '100%',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 4,
                      borderColor: 'primary.main',
                    },
                  }}
                  onClick={() => navigate(`/projects/${project.id}`)}
                >
                  <CardContent sx={{ p: 3 }}>
                    {/* Header */}
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        mb: 2,
                      }}
                    >
                      <StatusBadge status={project.status} type="project" />
                      <IconButton
                        size="small"
                        onClick={(e) => handleMenuOpen(e, project.id)}
                      >
                        <MoreVert fontSize="small" />
                      </IconButton>
                    </Box>

                    {/* Project Name */}
                    <Typography
                      variant="h6"
                      fontWeight={600}
                      sx={{
                        mb: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {project.name}
                    </Typography>

                    {/* Client - Only show for freelancer */}
                    {userRole === 'freelancer' && (
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1.5,
                          mb: 3,
                        }}
                      >
                        <UserAvatar name={project.clientName} size="small" />
                        <Typography variant="body2" color="text.secondary">
                          {project.clientName}
                        </Typography>
                      </Box>
                    )}

                    {/* Freelancer info - Only show for clients */}
                    {userRole === 'client' && (
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1.5,
                          mb: 3,
                        }}
                      >
                        <UserAvatar name="Alex Morgan" size="small" />
                        <Typography variant="body2" color="text.secondary">
                          Morgan Design Studio
                        </Typography>
                      </Box>
                    )}

                    {/* Stats */}
                    <Box
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: 2,
                        mb: 3,
                      }}
                    >
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Deliverables
                        </Typography>
                        <Typography variant="subtitle1" fontWeight={600}>
                          {project.deliverableCount}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          {config.canApprove ? 'To Review' : 'Pending'}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          fontWeight={600}
                          color={project.pendingApprovals > 0 ? 'warning.main' : 'text.primary'}
                        >
                          {project.pendingApprovals}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Payment Progress - Only for roles that can see it */}
                    {config.showPaymentProgress && (
                      <Box>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: 1,
                          }}
                        >
                          <Typography variant="caption" color="text.secondary">
                            Payment Progress
                          </Typography>
                          <Typography variant="caption" fontWeight={600}>
                            {formatCurrency(project.paidAmount)} / {formatCurrency(project.totalValue)}
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={progressPercent}
                          sx={{
                            height: 6,
                            borderRadius: 3,
                            backgroundColor: alpha(theme.palette.success.main, 0.1),
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: 'success.main',
                              borderRadius: 3,
                            },
                          }}
                        />
                      </Box>
                    )}

                    {/* Footer */}
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mt: 3,
                        pt: 2,
                        borderTop: `1px solid ${theme.palette.divider}`,
                      }}
                    >
                      <Typography variant="caption" color="text.secondary">
                        Updated {formatRelativeTime(project.updatedAt)}
                      </Typography>
                      {config.showPaymentProgress ? (
                        <Chip
                          label={`${progressPercent}% paid`}
                          size="small"
                          color={progressPercent >= 100 ? 'success' : 'default'}
                          sx={{ fontSize: '0.6875rem' }}
                        />
                      ) : project.pendingApprovals > 0 ? (
                        <Chip
                          label="Needs Review"
                          size="small"
                          color="warning"
                          sx={{ fontSize: '0.6875rem' }}
                        />
                      ) : (
                        <Chip
                          label="Up to date"
                          size="small"
                          color="success"
                          sx={{ fontSize: '0.6875rem' }}
                        />
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      {/* Context Menu - Role-based actions */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem
          onClick={() => {
            navigate(`/projects/${selectedProjectId}`);
            handleMenuClose();
          }}
        >
          <ListItemIcon>
            <Visibility fontSize="small" />
          </ListItemIcon>
          <ListItemText>View</ListItemText>
        </MenuItem>

        {/* Client approval actions */}
        {config.canApprove && (
          <>
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <ThumbUp fontSize="small" color="success" />
              </ListItemIcon>
              <ListItemText>Approve All</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <ThumbDown fontSize="small" color="error" />
              </ListItemIcon>
              <ListItemText>Request Changes</ListItemText>
            </MenuItem>
          </>
        )}

        {/* Edit action */}
        {config.canEdit && (
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <Edit fontSize="small" />
            </ListItemIcon>
            <ListItemText>Edit</ListItemText>
          </MenuItem>
        )}

        {/* Archive action - freelancer only */}
        {userRole === 'freelancer' && (
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <Archive fontSize="small" />
            </ListItemIcon>
            <ListItemText>Archive</ListItemText>
          </MenuItem>
        )}

        {/* Delete action */}
        {config.canDelete && (
          <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
            <ListItemIcon>
              <Delete fontSize="small" color="error" />
            </ListItemIcon>
            <ListItemText>Delete</ListItemText>
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
};

export default ProjectsPage;
