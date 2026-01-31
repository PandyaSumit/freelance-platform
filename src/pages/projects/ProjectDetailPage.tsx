import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  Divider,
  useTheme,
  alpha,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material';
import {
  ArrowBack,
  Add,
  CloudUpload,
  Download,
  Delete,
  CheckCircle,
  Error as ErrorIcon,
  Schedule,
  Send,
  ContentCopy,
  MoreVert,
} from '@mui/icons-material';
import { UserAvatar, StatusBadge, FileUploadZone, EmptyState } from '../../components/common';
import {
  getProjectById,
  getDeliverablesByProject,
  getInvoicesByProject,
  getActivitiesByProject,
  mockDeliverables,
} from '../../data/mockData';
import { formatCurrency, formatRelativeTime, formatFileSize, formatDate, copyToClipboard } from '../../utils/helpers';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => (
  <Box role="tabpanel" hidden={value !== index} sx={{ py: 3 }}>
    {value === index && children}
  </Box>
);

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [invoiceDialogOpen, setInvoiceDialogOpen] = useState(false);

  const project = getProjectById(id || '');
  const deliverables = id ? getDeliverablesByProject(id) : mockDeliverables;
  const invoices = id ? getInvoicesByProject(id) : [];
  const activities = id ? getActivitiesByProject(id) : [];

  if (!project) {
    return (
      <EmptyState
        title="Project not found"
        description="The project you're looking for doesn't exist or has been deleted."
        action={{ label: 'Back to Projects', onClick: () => navigate('/projects') }}
      />
    );
  }

  const clientPortalUrl = `https://flowlance.com/portal/${project.id}`;

  const handleCopyLink = async () => {
    await copyToClipboard(clientPortalUrl);
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/projects')}
          sx={{ mb: 2 }}
        >
          Back to Projects
        </Button>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', md: 'center' },
            gap: 2,
          }}
        >
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
              <Typography variant="h4" fontWeight={700}>
                {project.name}
              </Typography>
              <StatusBadge status={project.status} type="project" />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <UserAvatar name={project.clientName} size="small" />
              <Typography variant="body1" color="text.secondary">
                {project.clientName}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <Tooltip title="Copy client portal link">
              <Button
                variant="outlined"
                startIcon={<ContentCopy />}
                onClick={handleCopyLink}
              >
                Share Link
              </Button>
            </Tooltip>
            <Button
              variant="contained"
              startIcon={<CloudUpload />}
              onClick={() => setUploadDialogOpen(true)}
            >
              Upload Deliverable
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="caption" color="text.secondary">
                Total Value
              </Typography>
              <Typography variant="h5" fontWeight={700}>
                {formatCurrency(project.totalValue)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="caption" color="text.secondary">
                Paid
              </Typography>
              <Typography variant="h5" fontWeight={700} color="success.main">
                {formatCurrency(project.paidAmount)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="caption" color="text.secondary">
                Deliverables
              </Typography>
              <Typography variant="h5" fontWeight={700}>
                {project.deliverableCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="caption" color="text.secondary">
                Pending Approvals
              </Typography>
              <Typography variant="h5" fontWeight={700} color="warning.main">
                {project.pendingApprovals}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Card>
        <Box sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}>
          <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)}>
            <Tab label="Deliverables" />
            <Tab label="Payments" />
            <Tab label="Activity" />
          </Tabs>
        </Box>

        <CardContent>
          {/* Deliverables Tab */}
          <TabPanel value={tabValue} index={0}>
            {deliverables.length === 0 ? (
              <EmptyState
                title="No deliverables yet"
                description="Upload your first deliverable to share with your client."
                action={{ label: 'Upload Deliverable', onClick: () => setUploadDialogOpen(true) }}
              />
            ) : (
              <Grid container spacing={3}>
                {deliverables.map((deliverable) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={deliverable.id}>
                    <Card
                      sx={{
                        border: `1px solid ${theme.palette.divider}`,
                        '&:hover': { borderColor: 'primary.main' },
                      }}
                    >
                      {/* Thumbnail */}
                      <Box
                        sx={{
                          height: 160,
                          backgroundColor: 'grey.100',
                          backgroundImage: deliverable.thumbnailUrl
                            ? `url(${deliverable.thumbnailUrl})`
                            : 'none',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {!deliverable.thumbnailUrl && (
                          <Typography sx={{ fontSize: '3rem' }}>
                            🎨
                          </Typography>
                        )}
                      </Box>

                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <StatusBadge status={deliverable.status} type="deliverable" size="small" />
                          <Typography variant="caption" color="text.secondary">
                            v{deliverable.version}
                          </Typography>
                        </Box>

                        <Typography
                          variant="subtitle2"
                          fontWeight={600}
                          sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            mb: 0.5,
                          }}
                        >
                          {deliverable.fileName}
                        </Typography>

                        <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>
                          {formatFileSize(deliverable.fileSize)} • {formatRelativeTime(deliverable.uploadedAt)}
                        </Typography>

                        {deliverable.note && (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              mb: 2,
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                            }}
                          >
                            {deliverable.note}
                          </Typography>
                        )}

                        {deliverable.feedback && (
                          <Box
                            sx={{
                              p: 1.5,
                              borderRadius: 2,
                              backgroundColor: alpha(theme.palette.warning.main, 0.08),
                              mb: 2,
                            }}
                          >
                            <Typography variant="caption" fontWeight={600} color="warning.dark">
                              Client Feedback:
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                              {deliverable.feedback}
                            </Typography>
                          </Box>
                        )}

                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Button
                            size="small"
                            variant="outlined"
                            startIcon={<Download />}
                            fullWidth
                          >
                            Download
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </TabPanel>

          {/* Payments Tab */}
          <TabPanel value={tabValue} index={1}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => setInvoiceDialogOpen(true)}
              >
                Add Invoice
              </Button>
            </Box>

            {invoices.length === 0 ? (
              <EmptyState
                title="No invoices yet"
                description="Create your first invoice for this project."
                action={{ label: 'Create Invoice', onClick: () => setInvoiceDialogOpen(true) }}
              />
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Invoice</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Due Date</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {invoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {invoice.invoiceNumber}
                          </Typography>
                        </TableCell>
                        <TableCell>{invoice.description}</TableCell>
                        <TableCell>
                          <Typography fontWeight={600}>
                            {formatCurrency(invoice.amount)}
                          </Typography>
                        </TableCell>
                        <TableCell>{formatDate(invoice.dueDate)}</TableCell>
                        <TableCell>
                          <StatusBadge status={invoice.status} type="payment" />
                        </TableCell>
                        <TableCell align="right">
                          {invoice.status !== 'paid' && (
                            <Button size="small" startIcon={<Send />}>
                              Send Reminder
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </TabPanel>

          {/* Activity Tab */}
          <TabPanel value={tabValue} index={2}>
            {activities.length === 0 ? (
              <EmptyState
                title="No activity yet"
                description="Activity will appear here as you work on this project."
              />
            ) : (
              <Box>
                {activities.map((activity, index) => (
                  <Box
                    key={activity.id}
                    sx={{
                      display: 'flex',
                      gap: 2,
                      pb: 3,
                      position: 'relative',
                      '&:not(:last-child)': {
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          left: 15,
                          top: 32,
                          bottom: 0,
                          width: 2,
                          backgroundColor: 'divider',
                        },
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        backgroundColor:
                          activity.type === 'deliverable_approved'
                            ? alpha(theme.palette.success.main, 0.1)
                            : activity.type === 'changes_requested'
                            ? alpha(theme.palette.warning.main, 0.1)
                            : activity.type === 'invoice_paid'
                            ? alpha(theme.palette.success.main, 0.1)
                            : alpha(theme.palette.primary.main, 0.1),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      {activity.type === 'deliverable_approved' ? (
                        <CheckCircle sx={{ fontSize: 16, color: 'success.main' }} />
                      ) : activity.type === 'changes_requested' ? (
                        <ErrorIcon sx={{ fontSize: 16, color: 'warning.main' }} />
                      ) : (
                        <Schedule sx={{ fontSize: 16, color: 'primary.main' }} />
                      )}
                    </Box>
                    <Box>
                      <Typography variant="body2">
                        {activity.description}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {formatRelativeTime(activity.createdAt)}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            )}
          </TabPanel>
        </CardContent>
      </Card>

      {/* Upload Dialog */}
      <Dialog
        open={uploadDialogOpen}
        onClose={() => setUploadDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Upload Deliverable</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <FileUploadZone onFilesSelected={(files) => console.log(files)} />
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Add a note (optional)"
              placeholder="Describe what you're uploading..."
              sx={{ mt: 3 }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button onClick={() => setUploadDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setUploadDialogOpen(false)}>
            Upload
          </Button>
        </DialogActions>
      </Dialog>

      {/* Invoice Dialog */}
      <Dialog
        open={invoiceDialogOpen}
        onClose={() => setInvoiceDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Create Invoice</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <TextField
              fullWidth
              label="Description"
              placeholder="e.g., Milestone 1: Homepage Design"
            />
            <TextField
              fullWidth
              label="Amount"
              type="number"
              placeholder="0.00"
              InputProps={{ startAdornment: <Typography sx={{ mr: 1 }}>$</Typography> }}
            />
            <TextField
              fullWidth
              label="Due Date"
              type="date"
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button onClick={() => setInvoiceDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setInvoiceDialogOpen(false)}>
            Create Invoice
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProjectDetailPage;
