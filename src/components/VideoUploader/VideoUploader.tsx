import React from 'react';
import { Upload, FileVideo, AlertCircle } from 'lucide-react';
import { formatFileSize } from '../../utils/helpers.ts';
import type { VideoUploaderProps } from '../../types/index.ts';

const VideoUploader: React.FC<VideoUploaderProps> = ({
  selectedFile,
  onFileSelect,
  onRemoveFile,
  onProcessVideo,
  isProcessing,
  error
}) => {
  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) onFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onFileSelect(files[0]);
    }
  };

  return (
    <div className="video-uploader">
      <div
        className="upload-area"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {selectedFile ? (
          <div className="file-selected">
            <FileVideo className="file-icon" />
            <div className="file-info">
              <p className="file-name">{selectedFile.name}</p>
              <p className="file-size">{formatFileSize(selectedFile.size)}</p>
            </div>
            <button
              onClick={onRemoveFile}
              className="remove-file-btn"
              type="button"
            >
              Remove file
            </button>
          </div>
        ) : (
          <div className="upload-prompt">
            <Upload className="upload-icon" />
            <div>
              <p className="upload-title">Drop your video here</p>
              <p className="upload-subtitle">or click to browse</p>
              <label className="file-input-btn">
                Choose Video File
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileInput}
                  className="file-input-hidden"
                />
              </label>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="error-message">
          <AlertCircle className="error-icon" />
          <span>{error}</span>
        </div>
      )}

      <div className="process-section">
        <button
          onClick={onProcessVideo}
          disabled={!selectedFile || isProcessing}
          className="process-btn"
          type="button"
        >
          {isProcessing ? (
            <div className="processing-content">
              <div className="spinner"></div>
              <span>Processing Video...</span>
            </div>
          ) : (
            'Process Video'
          )}
        </button>
      </div>
    </div>
  );
};

export default VideoUploader;