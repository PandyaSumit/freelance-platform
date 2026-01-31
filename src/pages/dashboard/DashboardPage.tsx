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
} from '@mui/icons-material';
import { StatCard, UserAvatar, StatusBadge } from '../../components/common';
import { useAuth } from '../../context/AuthContext';
import { mockProjects, dashboardStats, mockInvoices } from '../../data/mockData';
import { formatCurrency, formatRelativeTime, getGreeting } from '../../utils/helpers';

const DashboardPage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user } = useAuth();

  const recentProjects = mockProjects.slice(0, 5);
  const pendingInvoices = mockInvoices.filter((inv) => inv.status !== 'paid').slice(0, 4);

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          {getGreeting()}, {user?.fullName?.split(' ')[0] || 'there'}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here's what's happening with your projects today.
        </Typography>
      </Box>

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
    </Box>
  );
};

export default DashboardPage;
