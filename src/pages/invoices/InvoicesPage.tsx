import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Tabs,
  Tab,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  useTheme,
  alpha,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Alert,
} from '@mui/material';
import {
  Add,
  Send,
  Download,
  MoreVert,
  Visibility,
  CheckCircle,
  Delete,
  CreditCard,
} from '@mui/icons-material';
import { SearchInput, StatusBadge, EmptyState } from '../../components/common';
import { useAuth } from '../../context/AuthContext';
import { mockInvoices } from '../../data/mockData';
import { formatCurrency, formatDate } from '../../utils/helpers';
import { PaymentStatus, UserRole } from '../../types';

// Role-based page configuration
const pageConfig: Record<UserRole, {
  title: string;
  subtitle: string;
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canMarkPaid: boolean;
  canSendReminder: boolean;
  canPay: boolean;
  showSummary: boolean;
}> = {
  freelancer: {
    title: 'Invoices',
    subtitle: 'Track and manage your payments',
    canCreate: true,
    canEdit: true,
    canDelete: true,
    canMarkPaid: true,
    canSendReminder: true,
    canPay: false,
    showSummary: true,
  },
  client: {
    title: 'Your Invoices',
    subtitle: 'View and pay your invoices',
    canCreate: false,
    canEdit: false,
    canDelete: false,
    canMarkPaid: false,
    canSendReminder: false,
    canPay: true,
    showSummary: true,
  },
  team_member: {
    title: 'Invoices',
    subtitle: 'View invoice history',
    canCreate: false,
    canEdit: false,
    canDelete: false,
    canMarkPaid: false,
    canSendReminder: false,
    canPay: false,
    showSummary: false,
  },
  client_sub_user: {
    title: 'Invoices',
    subtitle: 'View invoice status',
    canCreate: false,
    canEdit: false,
    canDelete: false,
    canMarkPaid: false,
    canSendReminder: false,
    canPay: false,
    showSummary: false,
  },
};

const InvoicesPage: React.FC = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const userRole = user?.role || 'freelancer';
  const config = pageConfig[userRole];

  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Different filters for different roles
  const freelancerFilters: { label: string; value: PaymentStatus | 'all' }[] = [
    { label: 'All', value: 'all' },
    { label: 'Paid', value: 'paid' },
    { label: 'Sent', value: 'sent' },
    { label: 'Viewed', value: 'viewed' },
    { label: 'Overdue', value: 'overdue' },
  ];

  const clientFilters: { label: string; value: PaymentStatus | 'all' }[] = [
    { label: 'All', value: 'all' },
    { label: 'Unpaid', value: 'sent' },
    { label: 'Overdue', value: 'overdue' },
    { label: 'Paid', value: 'paid' },
  ];

  const statusFilters = (userRole === 'client' || userRole === 'client_sub_user')
    ? clientFilters
    : freelancerFilters;

  const filteredInvoices = mockInvoices.filter((invoice) => {
    const matchesSearch =
      invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilters[tabValue].value === 'all' || invoice.status === statusFilters[tabValue].value;
    return matchesSearch && matchesStatus;
  });

  const totalPaid = mockInvoices.filter((i) => i.status === 'paid').reduce((sum, i) => sum + i.amount, 0);
  const totalPending = mockInvoices.filter((i) => i.status !== 'paid').reduce((sum, i) => sum + i.amount, 0);
  const totalOverdue = mockInvoices.filter((i) => i.status === 'overdue').reduce((sum, i) => sum + i.amount, 0);

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
          <Button variant="contained" startIcon={<Add />}>
            Create Invoice
          </Button>
        )}
      </Box>

      {/* Role-specific alerts */}
      {userRole === 'client' && totalPending > 0 && (
        <Alert
          severity="warning"
          sx={{ mb: 3 }}
          action={
            <Button color="inherit" size="small" startIcon={<CreditCard />}>
              Pay All
            </Button>
          }
        >
          You have {formatCurrency(totalPending)} in outstanding invoices. Pay now to avoid late fees.
        </Alert>
      )}

      {userRole === 'team_member' && (
        <Alert severity="info" sx={{ mb: 3 }}>
          You have view-only access to invoices. Contact the account owner for billing actions.
        </Alert>
      )}

      {userRole === 'client_sub_user' && (
        <Alert severity="info" sx={{ mb: 3 }}>
          You can view invoice status. Payment actions are handled by the primary account holder.
        </Alert>
      )}

      {/* Summary Cards - Only for roles that can see them */}
      {config.showSummary && (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
            gap: 3,
            mb: 4,
          }}
        >
          <Card>
            <CardContent>
              <Typography variant="caption" color="text.secondary">
                {userRole === 'client' ? 'Total Paid' : 'Total Paid'}
              </Typography>
              <Typography variant="h5" fontWeight={700} color="success.main">
                {formatCurrency(totalPaid)}
              </Typography>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Typography variant="caption" color="text.secondary">
                {userRole === 'client' ? 'Outstanding' : 'Pending'}
              </Typography>
              <Typography variant="h5" fontWeight={700} color="warning.main">
                {formatCurrency(totalPending)}
              </Typography>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Typography variant="caption" color="text.secondary">Overdue</Typography>
              <Typography variant="h5" fontWeight={700} color="error.main">
                {formatCurrency(totalOverdue)}
              </Typography>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Typography variant="caption" color="text.secondary">Total Invoices</Typography>
              <Typography variant="h5" fontWeight={700}>
                {mockInvoices.length}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      )}

      {/* Filters */}
      <Card>
        <Box sx={{ borderBottom: `1px solid ${theme.palette.divider}`, px: 2 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: { md: 'center' },
              gap: 2,
              py: 2,
            }}
          >
            <SearchInput
              placeholder="Search invoices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ width: { xs: '100%', md: 300 } }}
            />
            <Tabs
              value={tabValue}
              onChange={(e, v) => setTabValue(v)}
              variant="scrollable"
              scrollButtons="auto"
              sx={{ minHeight: 40, '& .MuiTab-root': { minHeight: 40 } }}
            >
              {statusFilters.map((filter) => (
                <Tab key={filter.value} label={filter.label} />
              ))}
            </Tabs>
          </Box>
        </Box>

        <CardContent sx={{ p: 0 }}>
          {filteredInvoices.length === 0 ? (
            <Box sx={{ p: 4 }}>
              <EmptyState
                title="No invoices found"
                description={
                  searchQuery
                    ? `No invoices match "${searchQuery}".`
                    : config.canCreate
                    ? 'Create your first invoice.'
                    : 'No invoices to display.'
                }
              />
            </Box>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Invoice</TableCell>
                    {/* Show Client column for freelancer/team, show Freelancer for clients */}
                    <TableCell>
                      {(userRole === 'client' || userRole === 'client_sub_user') ? 'From' : 'Client'}
                    </TableCell>
                    <TableCell>Project</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Due Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredInvoices.map((invoice) => (
                    <TableRow key={invoice.id} hover>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight={600}>
                          {invoice.invoiceNumber}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {invoice.description}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {(userRole === 'client' || userRole === 'client_sub_user')
                          ? 'Morgan Design Studio'
                          : invoice.clientName
                        }
                      </TableCell>
                      <TableCell>{invoice.projectName}</TableCell>
                      <TableCell>
                        <Typography fontWeight={600}>{formatCurrency(invoice.amount)}</Typography>
                      </TableCell>
                      <TableCell>{formatDate(invoice.dueDate)}</TableCell>
                      <TableCell>
                        <StatusBadge status={invoice.status} type="payment" />
                      </TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
                          {/* Pay button for clients */}
                          {config.canPay && invoice.status !== 'paid' && (
                            <Tooltip title="Pay Now">
                              <Button
                                size="small"
                                variant="contained"
                                startIcon={<CreditCard />}
                                sx={{ mr: 1 }}
                              >
                                Pay
                              </Button>
                            </Tooltip>
                          )}

                          {/* Send reminder for freelancer */}
                          {config.canSendReminder && invoice.status !== 'paid' && (
                            <Tooltip title="Send Reminder">
                              <IconButton size="small"><Send fontSize="small" /></IconButton>
                            </Tooltip>
                          )}

                          {/* Download for everyone */}
                          <Tooltip title="Download PDF">
                            <IconButton size="small"><Download fontSize="small" /></IconButton>
                          </Tooltip>

                          {/* More options menu */}
                          <IconButton size="small" onClick={(e) => setAnchorEl(e.currentTarget)}>
                            <MoreVert fontSize="small" />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>

      {/* Context Menu - Role-based */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        <MenuItem onClick={() => setAnchorEl(null)}>
          <ListItemIcon><Visibility fontSize="small" /></ListItemIcon>
          <ListItemText>View Details</ListItemText>
        </MenuItem>

        {/* Client pay option */}
        {config.canPay && (
          <MenuItem onClick={() => setAnchorEl(null)}>
            <ListItemIcon><CreditCard fontSize="small" color="primary" /></ListItemIcon>
            <ListItemText>Pay Invoice</ListItemText>
          </MenuItem>
        )}

        {/* Freelancer mark as paid */}
        {config.canMarkPaid && (
          <MenuItem onClick={() => setAnchorEl(null)}>
            <ListItemIcon><CheckCircle fontSize="small" color="success" /></ListItemIcon>
            <ListItemText>Mark as Paid</ListItemText>
          </MenuItem>
        )}

        {/* Send reminder */}
        {config.canSendReminder && (
          <MenuItem onClick={() => setAnchorEl(null)}>
            <ListItemIcon><Send fontSize="small" /></ListItemIcon>
            <ListItemText>Send Reminder</ListItemText>
          </MenuItem>
        )}

        {/* Download for everyone */}
        <MenuItem onClick={() => setAnchorEl(null)}>
          <ListItemIcon><Download fontSize="small" /></ListItemIcon>
          <ListItemText>Download PDF</ListItemText>
        </MenuItem>

        {/* Delete for freelancer */}
        {config.canDelete && (
          <MenuItem onClick={() => setAnchorEl(null)} sx={{ color: 'error.main' }}>
            <ListItemIcon><Delete fontSize="small" color="error" /></ListItemIcon>
            <ListItemText>Delete</ListItemText>
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
};

export default InvoicesPage;
