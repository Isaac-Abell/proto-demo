export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const isValidVideoFile = (file: File): boolean => {
  return file.type.startsWith('video/');
};

export const generateTimestamp = (): string => {
  return new Date().toISOString().replace(/[:.]/g, '-');
};