export interface Demographics {
  gender: { [key: string]: number };
  age: { [key: string]: number };
  race: { [key: string]: number };
}

export interface EngagementInsights {
  engagement: number[];
  male_engagement: number[];
  female_engagement: number[];
  age_engagement: { [key: string]: number[] };
  race_engagement: { [key: string]: number[] };
}

export interface ReportData {
  title: string;
  date: string; // ISO string
  file: string;
  demographics: Demographics;
  insights: EngagementInsights;
  top_engagement: string[];
  low_engagement_moments: string[];
  trends_over_time: string[];
  recommendations: string[];
  filename: string;
}

export interface VideoUploaderProps {
  selectedFile: File | null;
  onFileSelect: (file: File) => void;
  onRemoveFile: () => void;
  onProcessVideo: () => void;
  isProcessing: boolean;
  error: string | null;
}

export interface ReportPopupProps {
  onClose: () => void;
  onViewReport: () => void;
  onDownloadReport: () => void;
}

export interface ReportViewerProps {
  reportData: ReportData;
  onClose: () => void;
  onDownload: () => void;
}

export interface APIError extends Error {
  status?: number;
  code?: string;
}
