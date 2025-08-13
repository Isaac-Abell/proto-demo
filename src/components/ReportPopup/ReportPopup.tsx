import React from 'react';
import { CheckCircle, Eye, Download, X } from 'lucide-react';
import type { ReportPopupProps } from '../../types';

const ReportPopup: React.FC<ReportPopupProps> = ({ 
  onClose, 
  onViewReport, 
  onDownloadReport 
}) => {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="popup-modal">
        <div className="popup-header">
          <div className="popup-title">
            <CheckCircle className="success-icon" />
            <h2>Report Generated!</h2>
          </div>
          <button onClick={onClose} className="close-btn" type="button">
            <X className="close-icon" />
          </button>
        </div>
        
        <p className="popup-message">
          Your video has been processed successfully. Would you like to view the report?
        </p>
        
        <div className="popup-actions">
          <button onClick={onViewReport} className="view-btn" type="button">
            <Eye className="btn-icon" />
            <span>View Report</span>
          </button>
          <button onClick={onDownloadReport} className="download-btn" type="button">
            <Download className="btn-icon" />
            <span>Download</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportPopup;