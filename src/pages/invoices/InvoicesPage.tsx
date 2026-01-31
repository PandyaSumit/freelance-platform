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
} from '@mui/material';
import {
  Add,
  Send,
  Download,
  MoreVert,
  Visibility,
  CheckCircle,
  Delete,
} from '@mui/icons-material';
import { SearchInput, StatusBadge, EmptyState } from '../../components/common';
import { mockInvoices } from '../../data/mockData';
import { formatCurrency, formatDate } from '../../utils/helpers';
import { PaymentStatus } from '../../types';

const InvoicesPage: React.FC = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const statusFilters: { label: string; value: PaymentStatus | 'all' }[] = [
    { label: 'All', value: 'all' },
    { label: 'Paid', value: 'paid' },
    { label: 'Sent', value: 'sent' },
    { label: 'Viewed', value: 'viewed' },
    { label: 'Overdue', value: 'overdue' },
  ];

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
            Invoices
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Track and manage your payments
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />}>
          Create Invoice
        </Button>
      </Box>

      {/* Summary Cards */}
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
            <Typography variant="caption" color="text.secondary">Total Paid</Typography>
            <Typography variant="h5" fontWeight={700} color="success.main">
              {formatCurrency(totalPaid)}
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="caption" color="text.secondary">Pending</Typography>
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
                description={searchQuery ? `No invoices match "${searchQuery}".` : 'Create your first invoice.'}
              />
            </Box>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Invoice</TableCell>
                    <TableCell>Client</TableCell>
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
                      <TableCell>{invoice.clientName}</TableCell>
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
                          {invoice.status !== 'paid' && (
                            <Tooltip title="Send Reminder">
                              <IconButton size="small"><Send fontSize="small" /></IconButton>
                            </Tooltip>
                          )}
                          <Tooltip title="Download PDF">
                            <IconButton size="small"><Download fontSize="small" /></IconButton>
                          </Tooltip>
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

      {/* Context Menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        <MenuItem onClick={() => setAnchorEl(null)}>
          <ListItemIcon><Visibility fontSize="small" /></ListItemIcon>
          <ListItemText>View</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>
          <ListItemIcon><CheckCircle fontSize="small" /></ListItemIcon>
          <ListItemText>Mark as Paid</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)} sx={{ color: 'error.main' }}>
          <ListItemIcon><Delete fontSize="small" color="error" /></ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default InvoicesPage;
