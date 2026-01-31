import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  useTheme,
  alpha,
  Chip,
  Divider,
} from '@mui/material';
import { Download, CheckCircle, Edit, Schedule } from '@mui/icons-material';
import { Logo, StatusBadge } from '../../components/common';
import { mockDeliverables, mockInvoices } from '../../data/mockData';
import { formatCurrency, formatDate, formatFileSize, formatRelativeTime } from '../../utils/helpers';

const ClientPortalPage: React.FC = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);
  const [selectedDeliverable, setSelectedDeliverable] = useState<string | null>(null);
  const [feedback, setFeedback] = useState('');

  // Mock data for the client view
  const project = {
    name: 'Website Redesign',
    freelancerName: 'John Anderson',
    freelancerBusiness: 'Anderson Design Studio',
  };

  const deliverables = mockDeliverables;
  const invoices = mockInvoices.filter((i) => i.projectId === 'project-1');

  const handleApprove = (deliverableId: string) => {
    console.log('Approved:', deliverableId);
  };

  const handleRequestChanges = (deliverableId: string) => {
    setSelectedDeliverable(deliverableId);
    setFeedbackDialogOpen(true);
  };

  const handleSubmitFeedback = () => {
    console.log('Feedback for', selectedDeliverable, ':', feedback);
    setFeedbackDialogOpen(false);
    setFeedback('');
    setSelectedDeliverable(null);
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      {/* Header */}
      <Box
        sx={{
          backgroundColor: 'white',
          borderBottom: `1px solid ${theme.palette.divider}`,
          py: 2,
          px: { xs: 2, md: 4 },
        }}
      >
        <Box
          sx={{
            maxWidth: 1200,
            mx: 'auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Logo size="medium" />
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="body2" color="text.secondary">
              Logged in as
            </Typography>
            <Typography variant="subtitle2" fontWeight={600}>
              Sarah Johnson
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ maxWidth: 1200, mx: 'auto', p: { xs: 2, md: 4 } }}>
        {/* Project Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="overline" color="text.secondary">
            Project with {project.freelancerBusiness}
          </Typography>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            {project.name}
          </Typography>
          <Chip
            label="In Review"
            color="warning"
            size="small"
            sx={{ fontWeight: 500 }}
          />
        </Box>

        {/* Tabs */}
        <Card sx={{ mb: 4 }}>
          <Box sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}>
            <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)}>
              <Tab label="Deliverables" />
              <Tab label="Payments" />
            </Tabs>
          </Box>

          <CardContent sx={{ p: { xs: 2, md: 4 } }}>
            {/* Deliverables Tab */}
            {tabValue === 0 && (
              <Grid container spacing={3}>
                {deliverables.map((deliverable) => (
                  <Grid size={{ xs: 12, md: 6 }} key={deliverable.id}>
                    <Card
                      variant="outlined"
                      sx={{
                        height: '100%',
                        borderColor: deliverable.status === 'pending_review' ? 'warning.main' : 'divider',
                        borderWidth: deliverable.status === 'pending_review' ? 2 : 1,
                      }}
                    >
                      {/* Thumbnail */}
                      <Box
                        sx={{
                          height: 200,
                          backgroundColor: 'grey.100',
                          backgroundImage: deliverable.thumbnailUrl
                            ? `url(${deliverable.thumbnailUrl})`
                            : 'none',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          position: 'relative',
                        }}
                      >
                        {!deliverable.thumbnailUrl && (
                          <Typography sx={{ fontSize: '4rem' }}>🎨</Typography>
                        )}
                        <Box sx={{ position: 'absolute', top: 12, right: 12 }}>
                          <StatusBadge status={deliverable.status} type="deliverable" />
                        </Box>
                      </Box>

                      <CardContent>
                        <Typography variant="h6" fontWeight={600} gutterBottom>
                          {deliverable.fileName}
                        </Typography>

                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          {formatFileSize(deliverable.fileSize)} • Uploaded {formatRelativeTime(deliverable.uploadedAt)}
                        </Typography>

                        {deliverable.note && (
                          <Box
                            sx={{
                              p: 2,
                              borderRadius: 2,
                              backgroundColor: alpha(theme.palette.primary.main, 0.04),
                              mb: 3,
                            }}
                          >
                            <Typography variant="caption" color="primary.main" fontWeight={600}>
                              Note from {project.freelancerName}:
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 0.5 }}>
                              {deliverable.note}
                            </Typography>
                          </Box>
                        )}

                        {deliverable.status === 'changes_requested' && deliverable.feedback && (
                          <Box
                            sx={{
                              p: 2,
                              borderRadius: 2,
                              backgroundColor: alpha(theme.palette.warning.main, 0.08),
                              mb: 3,
                            }}
                          >
                            <Typography variant="caption" color="warning.dark" fontWeight={600}>
                              Your Feedback:
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 0.5 }}>
                              {deliverable.feedback}
                            </Typography>
                          </Box>
                        )}

                        <Box sx={{ display: 'flex', gap: 1.5 }}>
                          <Button
                            variant="outlined"
                            startIcon={<Download />}
                            fullWidth
                          >
                            Download
                          </Button>
                          {deliverable.status === 'pending_review' && (
                            <>
                              <Button
                                variant="contained"
                                color="success"
                                startIcon={<CheckCircle />}
                                fullWidth
                                onClick={() => handleApprove(deliverable.id)}
                              >
                                Approve
                              </Button>
                              <Button
                                variant="outlined"
                                color="warning"
                                startIcon={<Edit />}
                                fullWidth
                                onClick={() => handleRequestChanges(deliverable.id)}
                              >
                                Changes
                              </Button>
                            </>
                          )}
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}

            {/* Payments Tab */}
            {tabValue === 1 && (
              <Box>
                {invoices.map((invoice, index) => (
                  <Box
                    key={invoice.id}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      p: 3,
                      borderRadius: 2,
                      border: `1px solid ${theme.palette.divider}`,
                      mb: 2,
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 2,
                          backgroundColor:
                            invoice.status === 'paid'
                              ? alpha(theme.palette.success.main, 0.1)
                              : alpha(theme.palette.warning.main, 0.1),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {invoice.status === 'paid' ? (
                          <CheckCircle sx={{ color: 'success.main' }} />
                        ) : (
                          <Schedule sx={{ color: 'warning.main' }} />
                        )}
                      </Box>
                      <Box>
                        <Typography variant="subtitle1" fontWeight={600}>
                          {invoice.description}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Due: {formatDate(invoice.dueDate)}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="h6" fontWeight={700}>
                        {formatCurrency(invoice.amount)}
                      </Typography>
                      <Chip
                        label={invoice.status === 'paid' ? 'Paid' : 'Pending'}
                        color={invoice.status === 'paid' ? 'success' : 'warning'}
                        size="small"
                      />
                    </Box>
                  </Box>
                ))}

                <Divider sx={{ my: 3 }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" fontWeight={600}>
                    Total Project Value
                  </Typography>
                  <Typography variant="h5" fontWeight={700}>
                    {formatCurrency(invoices.reduce((sum, i) => sum + i.amount, 0))}
                  </Typography>
                </Box>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          textAlign: 'center',
          py: 4,
          color: 'text.secondary',
        }}
      >
        <Typography variant="body2">
          Powered by <strong>FlowLance</strong>
        </Typography>
      </Box>

      {/* Feedback Dialog */}
      <Dialog
        open={feedbackDialogOpen}
        onClose={() => setFeedbackDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Request Changes</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Please describe what changes you'd like to see.
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="e.g., Could you make the header text larger and change the blue to a darker shade?"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            autoFocus
          />
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button onClick={() => setFeedbackDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            color="warning"
            onClick={handleSubmitFeedback}
            disabled={!feedback.trim()}
          >
            Submit Feedback
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ClientPortalPage;
