import React from 'react';
import { Avatar, AvatarProps, useTheme, alpha } from '@mui/material';
import { getInitials } from '../../utils/helpers';

interface UserAvatarProps extends Omit<AvatarProps, 'src'> {
  name: string;
  src?: string;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  color?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({
  name,
  src,
  size = 'medium',
  color,
  sx,
  ...props
}) => {
  const theme = useTheme();

  const sizes = {
    small: 32,
    medium: 40,
    large: 56,
    xlarge: 80,
  };

  const fontSizes = {
    small: '0.75rem',
    medium: '0.875rem',
    large: '1.25rem',
    xlarge: '1.5rem',
  };

  // Generate consistent color from name
  const generateColor = (name: string) => {
    const colors = [
      theme.palette.primary.main,
      theme.palette.secondary.main,
      theme.palette.success.main,
      theme.palette.info.main,
      '#8B5CF6', // Purple
      '#EC4899', // Pink
      '#F59E0B', // Amber
      '#10B981', // Emerald
    ];

    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const bgColor = color || generateColor(name);

  return (
    <Avatar
      src={src}
      alt={name}
      sx={{
        width: sizes[size],
        height: sizes[size],
        fontSize: fontSizes[size],
        fontWeight: 600,
        backgroundColor: bgColor,
        color: '#fff',
        border: `2px solid ${alpha(bgColor, 0.2)}`,
        ...sx,
      }}
      {...props}
    >
      {getInitials(name)}
    </Avatar>
  );
};

export default UserAvatar;
