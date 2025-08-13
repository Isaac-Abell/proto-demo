import React from 'react';
import { Download, X } from 'lucide-react';
import type { ReportViewerProps } from '../../types';
import FilteredEngagementChart from '../FilteredEngagementChart/FilteredEngagementChart';
import DemographicChart from '../DemographicChart/DemographicChart';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Main ReportViewer component
const ReportViewer: React.FC<ReportViewerProps> = ({ reportData, onClose, onDownload }) => {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const { demographics, insights, trends_over_time, recommendations } = reportData;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="report-modal">
        <div className="report-header">
          <h2>{reportData.title}</h2>
          <div className="report-actions">
            <button onClick={onDownload} className="download-btn" type="button">
              <Download className="btn-icon" />
              <span>Download</span>
            </button>
            <button onClick={onClose} className="close-btn" type="button">
              <X className="close-icon" />
            </button>
          </div>
        </div>

        <div className="report-content">
          {/* Demographics */}
          <section className="demographics">
            <h3>Demographics</h3>
            <div className="demographics-cards">
              <DemographicChart title="Gender" data={demographics.gender} type="pie" />
              <DemographicChart title="Age" data={demographics.age} type="bar" />
              <DemographicChart title="Race" data={demographics.race} type="bar" />
            </div>
          </section>

          {/* Engagement */}
          <section className="engagement">
            <h3>Engagement</h3>
            <FilteredEngagementChart
              data={insights.engagement}
              label="Overall Engagement"
            />

            <h4>By Gender</h4>
            <FilteredEngagementChart
              data={{ male: insights.male_engagement, female: insights.female_engagement }}
              label="Engagement by Gender"
            />

            <h4>By Age</h4>
            <FilteredEngagementChart data={insights.age_engagement} label="Engagement by Age" />

            <h4>By Race</h4>
            <FilteredEngagementChart data={insights.race_engagement} label="Engagement by Race" />
          </section>

          {/* Trends */}
          <section className="trends">
            <h3>Trends Over Time</h3>
            <ul>
              {trends_over_time.map((trend, i) => (
                <li key={i}>{trend}</li>
              ))}
            </ul>
          </section>

          {/* Recommendations */}
          <section className="recommendations">
            <h3>Recommendations</h3>
            <ul>
              {recommendations.map((rec, i) => (
                <li key={i}>{rec}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ReportViewer;
