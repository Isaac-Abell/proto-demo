import React, { useState } from 'react';
import VideoUploader from './components/VideoUploader/VideoUploader';
import ReportPopup from './components/ReportPopup/ReportPopup';
import ReportViewer from './components/ReportViewer/ReportViewer';
import { processVideoAPI } from './services/api/api';
import downloadReport from './utils/downloadReport';
import type { ReportData } from './types';
import './App.css';

const App: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [showReport, setShowReport] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (file: File): void => {
    if (file && file.type.startsWith('video/')) {
      setSelectedFile(file);
      setError(null);
    } else {
      setError('Please select a valid video file');
    }
  };

  const handleRemoveFile = (): void => {
    setSelectedFile(null);
    setError(null);
  };

  const processVideo = async (): Promise<void> => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setError(null);

    try {
      const reportContent = await processVideoAPI(selectedFile);
      setReportData({
        ...(typeof reportContent === 'object' && reportContent !== null ? reportContent : {}),
        filename: `report_${Date.now()}.md`,
        title: reportContent?.title ?? 'Untitled Report',
        date: reportContent?.date ?? new Date().toISOString(),
        file: reportContent?.file ?? selectedFile?.name ?? '',
        demographics: reportContent?.demographics ?? {},
        summary: reportContent?.summary ?? '',
        engagement: reportContent?.engagement ?? {},
        recommendations: reportContent?.recommendations ?? '',
        additionalInfo: reportContent?.additionalInfo ?? ''
      });
      setShowPopup(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  const viewReport = (): void => {
    setShowReport(true);
    setShowPopup(false);
  };

  const closeReport = (): void => {
    setShowReport(false);
  };

  const closePopup = (): void => {
    setShowPopup(false);
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="app-title">
          Engagement Processor
        </h1>

        <div className="app-content">
          <VideoUploader
            selectedFile={selectedFile}
            onFileSelect={handleFileSelect}
            onRemoveFile={handleRemoveFile}
            onProcessVideo={processVideo}
            isProcessing={isProcessing}
            error={error}
          />
        </div>
      </div>

      {showPopup && (
        <ReportPopup
          onClose={closePopup}
          onViewReport={viewReport}
          onDownloadReport={() => {
            if (reportData) {
              downloadReport(reportData);
            }
          }}
        />
      )}

      {showReport && reportData && (
        <ReportViewer
          reportData={reportData}
          onClose={closeReport}
          onDownload={() => downloadReport(reportData)}
        />
      )}
    </div>
  );
};

export default App;