import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  IconButton,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  useTheme,
  alpha,
  Alert,
} from '@mui/material';
import {
  FolderOpen,
  PendingActions,
  Receipt,
  TrendingUp,
  Add,
  ArrowForward,
  MoreVert,
  Visibility,
  PersonAdd,
  CheckCircle,
  Schedule,
  AttachMoney,
  RateReview,
  ThumbUp,
  CreditCard,
} from '@mui/icons-material';
import { StatCard, UserAvatar, StatusBadge } from '../../components/common';
import { useAuth } from '../../context/AuthContext';
import { mockProjects, dashboardStats, mockInvoices } from '../../data/mockData';
import { formatCurrency, formatRelativeTime, getGreeting } from '../../utils/helpers';
import { UserRole } from '../../types';

// Role-specific greetings and descriptions
const roleGreetings: Record<UserRole, { title: string; subtitle: string }> = {
  freelancer: {
    title: "Here's what's happening with your projects today.",
    subtitle: 'Manage your clients and grow your business.',
  },
  client: {
    title: "Here's your project overview.",
    subtitle: 'Review deliverables and manage your payments.',
  },
  team_member: {
    title: "Here's your team workspace.",
    subtitle: 'Collaborate on projects and upload deliverables.',
  },
  client_sub_user: {
    title: 'Welcome to the project portal.',
    subtitle: 'Review project progress and add comments.',
  },
};

const DashboardPage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user } = useAuth();

  const userRole = user?.role || 'freelancer';
  const recentProjects = mockProjects.slice(0, 5);
  const pendingInvoices = mockInvoices.filter((inv) => inv.status !== 'paid').slice(0, 4);
  const pendingApprovalProjects = mockProjects.filter((p) => p.pendingApprovals > 0);

  // Freelancer Dashboard
  const FreelancerDashboard = () => (
    <>
      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Active Projects"
            value={dashboardStats.activeProjects}
            icon={FolderOpen}
            color="primary"
            trend={{ value: 12, label: 'vs last month' }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Pending Approvals"
            value={dashboardStats.pendingApprovals}
            icon={PendingActions}
            color="warning"
            subtitle="Awaiting client review"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Unpaid Invoices"
            value={formatCurrency(dashboardStats.unpaidInvoices)}
            icon={Receipt}
            color="error"
            subtitle={`${pendingInvoices.length} invoices pending`}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="This Month"
            value={formatCurrency(dashboardStats.monthlyRevenue)}
            icon={TrendingUp}
            color="success"
            trend={{ value: 8, label: 'vs last month' }}
          />
        </Grid>
      </Grid>

      {/* Main Content Grid */}
      <Grid container spacing={3}>
        {/* Recent Projects */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 0 }}>
              {/* Card Header */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: 3,
                  borderBottom: `1px solid ${theme.palette.divider}`,
                }}
              >
                <Box>
                  <Typography variant="h6" fontWeight={600}>
                    Recent Projects
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Your latest client projects
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  size="small"
                  onClick={() => navigate('/projects/new')}
                >
                  New Project
                </Button>
              </Box>

              {/* Projects Table */}
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Project</TableCell>
                      <TableCell>Client</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Progress</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentProjects.map((project) => {
                      const progressPercent = project.totalValue > 0
                        ? Math.round((project.paidAmount / project.totalValue) * 100)
                        : 0;

                      return (
                        <TableRow
                          key={project.id}
                          sx={{
                            cursor: 'pointer',
                            '&:hover': { backgroundColor: theme.palette.grey[50] },
                          }}
                          onClick={() => navigate(`/projects/${project.id}`)}
                        >
                          <TableCell>
                            <Box>
                              <Typography variant="subtitle2" fontWeight={600}>
                                {project.name}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {project.deliverableCount} deliverables
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                              <UserAvatar name={project.clientName} size="small" />
                              <Typography variant="body2">
                                {project.clientName}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <StatusBadge status={project.status} type="project" />
                          </TableCell>
                          <TableCell>
                            <Box sx={{ width: 120 }}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                <Typography variant="caption" color="text.secondary">
                                  Payment
                                </Typography>
                                <Typography variant="caption" fontWeight={600}>
                                  {progressPercent}%
                                </Typography>
                              </Box>
                              <LinearProgress
                                variant="determinate"
                                value={progressPercent}
                                sx={{
                                  backgroundColor: alpha(theme.palette.success.main, 0.1),
                                  '& .MuiLinearProgress-bar': {
                                    backgroundColor: 'success.main',
                                  },
                                }}
                              />
                            </Box>
                          </TableCell>
                          <TableCell align="right">
                            <Tooltip title="View project">
                              <IconButton
                                size="small"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(`/projects/${project.id}`);
                                }}
                              >
                                <Visibility fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="More options">
                              <IconButton
                                size="small"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <MoreVert fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* View All Link */}
              <Box sx={{ p: 2, textAlign: 'center', borderTop: `1px solid ${theme.palette.divider}` }}>
                <Button
                  endIcon={<ArrowForward />}
                  onClick={() => navigate('/projects')}
                >
                  View all projects
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Pending Invoices */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 0 }}>
              {/* Card Header */}
              <Box
                sx={{
                  p: 3,
                  borderBottom: `1px solid ${theme.palette.divider}`,
                }}
              >
                <Typography variant="h6" fontWeight={600}>
                  Pending Payments
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Invoices awaiting payment
                </Typography>
              </Box>

              {/* Invoice List */}
              <Box sx={{ p: 2 }}>
                {pendingInvoices.length === 0 ? (
                  <Box sx={{ py: 4, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      No pending invoices
                    </Typography>
                  </Box>
                ) : (
                  pendingInvoices.map((invoice, index) => (
                    <Box
                      key={invoice.id}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        p: 2,
                        borderRadius: 2,
                        mb: index < pendingInvoices.length - 1 ? 1 : 0,
                        cursor: 'pointer',
                        transition: 'background-color 0.2s',
                        '&:hover': {
                          backgroundColor: theme.palette.grey[50],
                        },
                      }}
                      onClick={() => navigate('/invoices')}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: 2,
                            backgroundColor: alpha(
                              invoice.status === 'overdue'
                                ? theme.palette.error.main
                                : invoice.status === 'viewed'
                                ? theme.palette.warning.main
                                : theme.palette.info.main,
                              0.1
                            ),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Receipt
                            sx={{
                              fontSize: 20,
                              color: invoice.status === 'overdue'
                                ? 'error.main'
                                : invoice.status === 'viewed'
                                ? 'warning.main'
                                : 'info.main',
                            }}
                          />
                        </Box>
                        <Box>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {invoice.invoiceNumber}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {invoice.clientName}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="subtitle2" fontWeight={600}>
                          {formatCurrency(invoice.amount)}
                        </Typography>
                        <Chip
                          label={invoice.status}
                          size="small"
                          color={
                            invoice.status === 'overdue'
                              ? 'error'
                              : invoice.status === 'viewed'
                              ? 'warning'
                              : 'info'
                          }
                          sx={{ fontSize: '0.6875rem', height: 20 }}
                        />
                      </Box>
                    </Box>
                  ))
                )}
              </Box>

              {/* View All Link */}
              <Box sx={{ p: 2, textAlign: 'center', borderTop: `1px solid ${theme.palette.divider}` }}>
                <Button
                  endIcon={<ArrowForward />}
                  onClick={() => navigate('/invoices')}
                >
                  View all invoices
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
          Quick Actions
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Card
              sx={{
                cursor: 'pointer',
                transition: 'all 0.2s',
                '&:hover': { transform: 'translateY(-4px)', boxShadow: 3 },
              }}
              onClick={() => navigate('/projects/new')}
            >
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ width: 48, height: 48, borderRadius: 2, backgroundColor: alpha(theme.palette.primary.main, 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FolderOpen sx={{ color: theme.palette.primary.main }} />
                </Box>
                <Box>
                  <Typography variant="subtitle1" fontWeight={600}>New Project</Typography>
                  <Typography variant="caption" color="text.secondary">Click to get started</Typography>
                </Box>
                <ArrowForward sx={{ ml: 'auto', color: 'text.secondary' }} />
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Card
              sx={{
                cursor: 'pointer',
                transition: 'all 0.2s',
                '&:hover': { transform: 'translateY(-4px)', boxShadow: 3 },
              }}
              onClick={() => navigate('/clients/new')}
            >
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ width: 48, height: 48, borderRadius: 2, backgroundColor: alpha(theme.palette.info.main, 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <PersonAdd sx={{ color: theme.palette.info.main }} />
                </Box>
                <Box>
                  <Typography variant="subtitle1" fontWeight={600}>Add Client</Typography>
                  <Typography variant="caption" color="text.secondary">Click to get started</Typography>
                </Box>
                <ArrowForward sx={{ ml: 'auto', color: 'text.secondary' }} />
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Card
              sx={{
                cursor: 'pointer',
                transition: 'all 0.2s',
                '&:hover': { transform: 'translateY(-4px)', boxShadow: 3 },
              }}
              onClick={() => navigate('/invoices/new')}
            >
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ width: 48, height: 48, borderRadius: 2, backgroundColor: alpha(theme.palette.success.main, 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Receipt sx={{ color: theme.palette.success.main }} />
                </Box>
                <Box>
                  <Typography variant="subtitle1" fontWeight={600}>Create Invoice</Typography>
                  <Typography variant="caption" color="text.secondary">Click to get started</Typography>
                </Box>
                <ArrowForward sx={{ ml: 'auto', color: 'text.secondary' }} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );

  // Client Dashboard
  const ClientDashboard = () => (
    <>
      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Your Projects"
            value={3}
            icon={FolderOpen}
            color="primary"
            subtitle="Active projects"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Pending Review"
            value={5}
            icon={RateReview}
            color="warning"
            subtitle="Items to approve"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Unpaid Invoices"
            value={formatCurrency(2500)}
            icon={Receipt}
            color="error"
            subtitle="2 invoices due"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Total Paid"
            value={formatCurrency(12500)}
            icon={CheckCircle}
            color="success"
            subtitle="This year"
          />
        </Grid>
      </Grid>

      {/* Action Alert for Clients */}
      <Alert
        severity="info"
        sx={{ mb: 3 }}
        action={
          <Button color="inherit" size="small" onClick={() => navigate('/projects?filter=pending')}>
            Review Now
          </Button>
        }
      >
        You have 5 deliverables awaiting your approval. Please review them to keep the project moving.
      </Alert>

      {/* Main Content Grid */}
      <Grid container spacing={3}>
        {/* Pending Approvals */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card>
            <CardContent sx={{ p: 0 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: 3,
                  borderBottom: `1px solid ${theme.palette.divider}`,
                }}
              >
                <Box>
                  <Typography variant="h6" fontWeight={600}>
                    Pending Approvals
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Deliverables waiting for your review
                  </Typography>
                </Box>
              </Box>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Project</TableCell>
                      <TableCell>Deliverable</TableCell>
                      <TableCell>Submitted</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pendingApprovalProjects.slice(0, 5).map((project, idx) => (
                      <TableRow
                        key={project.id}
                        sx={{
                          cursor: 'pointer',
                          '&:hover': { backgroundColor: theme.palette.grey[50] },
                        }}
                        onClick={() => navigate(`/projects/${project.id}`)}
                      >
                        <TableCell>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {project.name}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <FolderOpen sx={{ fontSize: 18, color: 'text.secondary' }} />
                            <Typography variant="body2">
                              Design Mockup v{idx + 1}.pdf
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {formatRelativeTime(project.updatedAt)}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Button
                            size="small"
                            variant="contained"
                            startIcon={<ThumbUp />}
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/projects/${project.id}`);
                            }}
                          >
                            Review
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Box sx={{ p: 2, textAlign: 'center', borderTop: `1px solid ${theme.palette.divider}` }}>
                <Button
                  endIcon={<ArrowForward />}
                  onClick={() => navigate('/projects?filter=pending')}
                >
                  View all pending approvals
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Outstanding Invoices */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 0 }}>
              <Box
                sx={{
                  p: 3,
                  borderBottom: `1px solid ${theme.palette.divider}`,
                }}
              >
                <Typography variant="h6" fontWeight={600}>
                  Outstanding Invoices
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Your pending payments
                </Typography>
              </Box>

              <Box sx={{ p: 2 }}>
                {pendingInvoices.slice(0, 3).map((invoice, index) => (
                  <Box
                    key={invoice.id}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      p: 2,
                      borderRadius: 2,
                      mb: index < 2 ? 1 : 0,
                      cursor: 'pointer',
                      transition: 'background-color 0.2s',
                      '&:hover': {
                        backgroundColor: theme.palette.grey[50],
                      },
                    }}
                    onClick={() => navigate('/invoices')}
                  >
                    <Box>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {invoice.invoiceNumber}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Due: {new Date(invoice.dueDate).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {formatCurrency(invoice.amount)}
                      </Typography>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<CreditCard />}
                        sx={{ mt: 0.5 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate('/invoices');
                        }}
                      >
                        Pay Now
                      </Button>
                    </Box>
                  </Box>
                ))}
              </Box>

              <Box sx={{ p: 2, textAlign: 'center', borderTop: `1px solid ${theme.palette.divider}` }}>
                <Button
                  endIcon={<ArrowForward />}
                  onClick={() => navigate('/invoices')}
                >
                  View all invoices
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );

  // Team Member Dashboard
  const TeamMemberDashboard = () => (
    <>
      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Assigned Projects"
            value={dashboardStats.activeProjects}
            icon={FolderOpen}
            color="primary"
            subtitle="You're working on"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Pending Approvals"
            value={dashboardStats.pendingApprovals}
            icon={PendingActions}
            color="warning"
            subtitle="Awaiting client review"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Completed This Week"
            value={8}
            icon={CheckCircle}
            color="success"
            subtitle="Deliverables uploaded"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Due Today"
            value={2}
            icon={Schedule}
            color="error"
            subtitle="Deliverables due"
          />
        </Grid>
      </Grid>

      {/* Team Notice */}
      <Alert
        severity="warning"
        sx={{ mb: 3 }}
      >
        You're logged in as a team member. Some features like billing and client management are restricted.
      </Alert>

      {/* Main Content Grid */}
      <Grid container spacing={3}>
        {/* Your Assigned Projects */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 0 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: 3,
                  borderBottom: `1px solid ${theme.palette.divider}`,
                }}
              >
                <Box>
                  <Typography variant="h6" fontWeight={600}>
                    Your Assigned Projects
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Projects you're working on
                  </Typography>
                </Box>
              </Box>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Project</TableCell>
                      <TableCell>Client</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Your Tasks</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentProjects.map((project) => (
                      <TableRow
                        key={project.id}
                        sx={{
                          cursor: 'pointer',
                          '&:hover': { backgroundColor: theme.palette.grey[50] },
                        }}
                        onClick={() => navigate(`/projects/${project.id}`)}
                      >
                        <TableCell>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {project.name}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <UserAvatar name={project.clientName} size="small" />
                            <Typography variant="body2">
                              {project.clientName}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={project.status} type="project" />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={`${project.deliverableCount} deliverables`}
                            size="small"
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/projects/${project.id}`);
                            }}
                          >
                            Upload
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Box sx={{ p: 2, textAlign: 'center', borderTop: `1px solid ${theme.palette.divider}` }}>
                <Button
                  endIcon={<ArrowForward />}
                  onClick={() => navigate('/projects')}
                >
                  View all projects
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Activity Feed */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 0 }}>
              <Box
                sx={{
                  p: 3,
                  borderBottom: `1px solid ${theme.palette.divider}`,
                }}
              >
                <Typography variant="h6" fontWeight={600}>
                  Recent Activity
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Team updates
                </Typography>
              </Box>

              <Box sx={{ p: 2 }}>
                {[
                  { text: 'Alex uploaded Homepage Design v2', time: '2 hours ago', icon: <FolderOpen />, color: 'primary' },
                  { text: 'Client approved Landing Page', time: '5 hours ago', icon: <CheckCircle />, color: 'success' },
                  { text: 'New invoice created', time: '1 day ago', icon: <Receipt />, color: 'info' },
                  { text: 'Changes requested on Logo', time: '2 days ago', icon: <PendingActions />, color: 'warning' },
                ].map((activity, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 2,
                      p: 1.5,
                      borderRadius: 2,
                      mb: 1,
                    }}
                  >
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: 1.5,
                        backgroundColor: alpha(theme.palette[activity.color as 'primary' | 'success' | 'info' | 'warning'].main, 0.1),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: `${activity.color}.main`,
                      }}
                    >
                      {React.cloneElement(activity.icon, { sx: { fontSize: 16 } })}
                    </Box>
                    <Box>
                      <Typography variant="body2">
                        {activity.text}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {activity.time}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );

  // Client Sub User (Reviewer) Dashboard
  const ClientSubUserDashboard = () => (
    <>
      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <StatCard
            title="Projects to Review"
            value={3}
            icon={FolderOpen}
            color="primary"
            subtitle="Shared with you"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <StatCard
            title="New Deliverables"
            value={7}
            icon={Visibility}
            color="info"
            subtitle="Ready for review"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <StatCard
            title="Pending Invoices"
            value={2}
            icon={Receipt}
            color="warning"
            subtitle="View only"
          />
        </Grid>
      </Grid>

      {/* Reviewer Notice */}
      <Alert
        severity="info"
        sx={{ mb: 3 }}
      >
        You're logged in as a reviewer. You can view projects and leave comments, but approval actions are reserved for the primary client.
      </Alert>

      {/* Main Content */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent sx={{ p: 0 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: 3,
                  borderBottom: `1px solid ${theme.palette.divider}`,
                }}
              >
                <Box>
                  <Typography variant="h6" fontWeight={600}>
                    Shared Projects
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Projects shared with you for review
                  </Typography>
                </Box>
              </Box>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Project</TableCell>
                      <TableCell>Deliverables</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Last Updated</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentProjects.slice(0, 3).map((project) => (
                      <TableRow
                        key={project.id}
                        sx={{
                          cursor: 'pointer',
                          '&:hover': { backgroundColor: theme.palette.grey[50] },
                        }}
                        onClick={() => navigate(`/projects/${project.id}`)}
                      >
                        <TableCell>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {project.name}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {project.deliverableCount} files
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={project.status} type="project" />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {formatRelativeTime(project.updatedAt)}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Button
                            size="small"
                            variant="outlined"
                            startIcon={<Visibility />}
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/projects/${project.id}`);
                            }}
                          >
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Box sx={{ p: 2, textAlign: 'center', borderTop: `1px solid ${theme.palette.divider}` }}>
                <Button
                  endIcon={<ArrowForward />}
                  onClick={() => navigate('/projects')}
                >
                  View all projects
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );

  // Render appropriate dashboard based on role
  const renderDashboard = () => {
    switch (userRole) {
      case 'client':
        return <ClientDashboard />;
      case 'team_member':
        return <TeamMemberDashboard />;
      case 'client_sub_user':
        return <ClientSubUserDashboard />;
      default:
        return <FreelancerDashboard />;
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          {getGreeting()}, {user?.fullName?.split(' ')[0] || 'there'}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {roleGreetings[userRole].title}
        </Typography>
      </Box>

      {renderDashboard()}
    </Box>
  );
};

export default DashboardPage;
