import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Add,
  MoreVert,
  Visibility,
  Edit,
  Delete,
  Email,
  Phone,
  Business,
} from '@mui/icons-material';
import { SearchInput, UserAvatar, EmptyState } from '../../components/common';
import { mockClients } from '../../data/mockData';
import { formatCurrency, formatRelativeTime } from '../../utils/helpers';

const ClientsPage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const filteredClients = mockClients.filter((client) =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, clientId: string) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedClientId(clientId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedClientId(null);
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
            Clients
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your client relationships
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setAddDialogOpen(true)}
          sx={{ alignSelf: { xs: 'stretch', sm: 'auto' } }}
        >
          Add Client
        </Button>
      </Box>

      {/* Search */}
      <Box sx={{ mb: 3 }}>
        <SearchInput
          placeholder="Search clients..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ width: { xs: '100%', md: 300 } }}
        />
      </Box>

      {/* Clients Grid */}
      {filteredClients.length === 0 ? (
        <EmptyState
          title="No clients found"
          description={
            searchQuery
              ? `No clients match "${searchQuery}".`
              : 'Add your first client to get started.'
          }
          action={
            !searchQuery
              ? { label: 'Add Client', onClick: () => setAddDialogOpen(true) }
              : undefined
          }
        />
      ) : (
        <Grid container spacing={3}>
          {filteredClients.map((client) => (
            <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={client.id}>
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
                onClick={() => navigate(`/projects?client=${client.id}`)}
              >
                <CardContent sx={{ p: 3 }}>
                  {/* Header */}
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      mb: 3,
                    }}
                  >
                    <UserAvatar name={client.name} size="large" />
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuOpen(e, client.id)}
                    >
                      <MoreVert fontSize="small" />
                    </IconButton>
                  </Box>

                  {/* Client Info */}
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    {client.name}
                  </Typography>

                  {client.company && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Business sx={{ fontSize: 16, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {client.company}
                      </Typography>
                    </Box>
                  )}

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Email sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {client.email}
                    </Typography>
                  </Box>

                  {client.phone && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <Phone sx={{ fontSize: 16, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {client.phone}
                      </Typography>
                    </Box>
                  )}

                  {/* Stats */}
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: 2,
                      pt: 2,
                      borderTop: `1px solid ${theme.palette.divider}`,
                    }}
                  >
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Active Projects
                      </Typography>
                      <Typography variant="h6" fontWeight={600}>
                        {client.activeProjects}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Total Paid
                      </Typography>
                      <Typography variant="h6" fontWeight={600} color="success.main">
                        {formatCurrency(client.totalPaid)}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Footer */}
                  <Box sx={{ mt: 2, pt: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
                    <Typography variant="caption" color="text.secondary">
                      Last activity: {client.lastActivityAt ? formatRelativeTime(client.lastActivityAt) : 'Never'}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Context Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon><Visibility fontSize="small" /></ListItemIcon>
          <ListItemText>View Projects</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon><Edit fontSize="small" /></ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
          <ListItemIcon><Delete fontSize="small" color="error" /></ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>

      {/* Add Client Dialog */}
      <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Client</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <TextField fullWidth label="Full Name" placeholder="John Doe" autoFocus />
            <TextField fullWidth label="Email" placeholder="john@example.com" type="email" />
            <TextField fullWidth label="Company (optional)" placeholder="Acme Corp" />
            <TextField fullWidth label="Phone (optional)" placeholder="+1 (555) 123-4567" />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button onClick={() => setAddDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setAddDialogOpen(false)}>
            Add Client
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ClientsPage;
