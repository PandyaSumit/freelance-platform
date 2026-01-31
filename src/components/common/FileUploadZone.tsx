import React, { useCallback, useState } from 'react';
import { Box, Typography, alpha, useTheme, IconButton, LinearProgress } from '@mui/material';
import { CloudUpload, Close, InsertDriveFile } from '@mui/icons-material';
import { formatFileSize, getFileTypeFromExtension, getFileTypeIcon } from '../../utils/helpers';

interface UploadedFile {
  file: File;
  id: string;
  progress: number;
}

interface FileUploadZoneProps {
  onFilesSelected: (files: File[]) => void;
  maxFiles?: number;
  maxSize?: number; // in bytes
  acceptedTypes?: string;
  disabled?: boolean;
}

const FileUploadZone: React.FC<FileUploadZoneProps> = ({
  onFilesSelected,
  maxFiles = 5,
  maxSize = 50 * 1024 * 1024, // 50MB default
  acceptedTypes = '*',
  disabled = false,
}) => {
  const theme = useTheme();
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragging(true);
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const validateFiles = useCallback((files: File[]): File[] => {
    setError(null);
    const validFiles: File[] = [];

    for (const file of files) {
      if (uploadedFiles.length + validFiles.length >= maxFiles) {
        setError(`Maximum ${maxFiles} files allowed`);
        break;
      }

      if (file.size > maxSize) {
        setError(`File "${file.name}" exceeds maximum size of ${formatFileSize(maxSize)}`);
        continue;
      }

      validFiles.push(file);
    }

    return validFiles;
  }, [maxFiles, maxSize, uploadedFiles.length]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (disabled) return;

    const files = Array.from(e.dataTransfer.files);
    const validFiles = validateFiles(files);

    if (validFiles.length > 0) {
      // Simulate upload progress
      const newFiles: UploadedFile[] = validFiles.map((file) => ({
        file,
        id: `${Date.now()}-${Math.random()}`,
        progress: 0,
      }));

      setUploadedFiles((prev) => [...prev, ...newFiles]);
      onFilesSelected(validFiles);

      // Simulate progress
      newFiles.forEach((uploadedFile) => {
        let progress = 0;
        const interval = setInterval(() => {
          progress += Math.random() * 30;
          if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
          }
          setUploadedFiles((prev) =>
            prev.map((f) =>
              f.id === uploadedFile.id ? { ...f, progress } : f
            )
          );
        }, 200);
      });
    }
  }, [disabled, validateFiles, onFilesSelected]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || disabled) return;

    const files = Array.from(e.target.files);
    const validFiles = validateFiles(files);

    if (validFiles.length > 0) {
      const newFiles: UploadedFile[] = validFiles.map((file) => ({
        file,
        id: `${Date.now()}-${Math.random()}`,
        progress: 100,
      }));

      setUploadedFiles((prev) => [...prev, ...newFiles]);
      onFilesSelected(validFiles);
    }

    e.target.value = '';
  }, [disabled, validateFiles, onFilesSelected]);

  const removeFile = useCallback((id: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== id));
  }, []);

  return (
    <Box>
      <Box
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => !disabled && document.getElementById('file-upload-input')?.click()}
        sx={{
          border: `2px dashed ${isDragging ? theme.palette.primary.main : theme.palette.grey[300]}`,
          borderRadius: 3,
          p: 4,
          textAlign: 'center',
          cursor: disabled ? 'not-allowed' : 'pointer',
          backgroundColor: isDragging
            ? alpha(theme.palette.primary.main, 0.04)
            : alpha(theme.palette.grey[500], 0.02),
          transition: 'all 0.2s ease-in-out',
          opacity: disabled ? 0.6 : 1,
          '&:hover': {
            borderColor: disabled ? theme.palette.grey[300] : theme.palette.primary.light,
            backgroundColor: disabled ? 'transparent' : alpha(theme.palette.primary.main, 0.02),
          },
        }}
      >
        <input
          id="file-upload-input"
          type="file"
          multiple
          accept={acceptedTypes}
          onChange={handleFileInput}
          style={{ display: 'none' }}
          disabled={disabled}
        />

        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            backgroundColor: alpha(theme.palette.primary.main, 0.1),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 2,
          }}
        >
          <CloudUpload sx={{ fontSize: 32, color: 'primary.main' }} />
        </Box>

        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          {isDragging ? 'Drop files here' : 'Drag & drop files here'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          or click to browse from your computer
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
          Max {maxFiles} files, up to {formatFileSize(maxSize)} each
        </Typography>
      </Box>

      {error && (
        <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
          {error}
        </Typography>
      )}

      {uploadedFiles.length > 0 && (
        <Box sx={{ mt: 2 }}>
          {uploadedFiles.map((uploadedFile) => (
            <Box
              key={uploadedFile.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                p: 1.5,
                borderRadius: 2,
                backgroundColor: 'grey.50',
                mb: 1,
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 1.5,
                  backgroundColor: 'background.paper',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                }}
              >
                {getFileTypeIcon(getFileTypeFromExtension(uploadedFile.file.name))}
              </Box>

              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  variant="body2"
                  fontWeight={500}
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {uploadedFile.file.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {formatFileSize(uploadedFile.file.size)}
                </Typography>
                {uploadedFile.progress < 100 && (
                  <LinearProgress
                    variant="determinate"
                    value={uploadedFile.progress}
                    sx={{ mt: 0.5, height: 4, borderRadius: 2 }}
                  />
                )}
              </Box>

              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(uploadedFile.id);
                }}
                sx={{ color: 'text.secondary' }}
              >
                <Close fontSize="small" />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default FileUploadZone;
