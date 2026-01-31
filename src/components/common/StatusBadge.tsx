import React from 'react';
import { Chip, ChipProps } from '@mui/material';
import {
  projectStatusConfig,
  deliverableStatusConfig,
  paymentStatusConfig,
  ProjectStatus,
  DeliverableStatus,
  PaymentStatus,
} from '../../types';

interface StatusBadgeProps {
  status: ProjectStatus | DeliverableStatus | PaymentStatus;
  type: 'project' | 'deliverable' | 'payment';
  size?: 'small' | 'medium';
  showIcon?: boolean;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  type,
  size = 'small',
  showIcon = true,
}) => {
  const getConfig = () => {
    switch (type) {
      case 'project':
        return projectStatusConfig[status as ProjectStatus];
      case 'deliverable':
        return deliverableStatusConfig[status as DeliverableStatus];
      case 'payment':
        return paymentStatusConfig[status as PaymentStatus];
      default:
        return { label: status, color: 'default' as const };
    }
  };

  const config = getConfig();
  const icon = type === 'deliverable' && showIcon
    ? deliverableStatusConfig[status as DeliverableStatus]?.icon
    : undefined;

  return (
    <Chip
      label={
        <>
          {icon && <span style={{ marginRight: 4 }}>{icon}</span>}
          {config.label}
        </>
      }
      color={config.color as ChipProps['color']}
      size={size}
      sx={{
        fontWeight: 500,
        '& .MuiChip-label': {
          display: 'flex',
          alignItems: 'center',
        },
      }}
    />
  );
};

export default StatusBadge;
