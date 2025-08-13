import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import type { ReportData } from '../types';

const downloadReport = async (reportData: ReportData): Promise<void> => {
  if (!reportData) return;

  // Create a hidden div to render the report nicely
  const container = document.createElement('div');
  container.style.width = '800px';
  container.style.padding = '20px';
  container.style.background = 'white';
  container.style.color = 'black';
  container.style.fontFamily = 'Arial, sans-serif';
  container.style.position = 'absolute';
  container.style.left = '-10000px'; // offscreen
  document.body.appendChild(container);
    
  // Build the report HTML
  container.innerHTML = `
    <h1>${reportData.title}</h1>
    <p><strong>Date:</strong> ${new Date(reportData.date).toLocaleString()}</p>
    <p><strong>File:</strong> ${reportData.file}</p>

    <h2>Demographics</h2>
    ${Object.entries(reportData.demographics.gender).map(([k, v]) => `<p>Gender ${k}: ${v}</p>`).join('')}
    ${Object.entries(reportData.demographics.age).map(([k, v]) => `<p>Age ${k}: ${v}</p>`).join('')}
    ${Object.entries(reportData.demographics.race).map(([k, v]) => `<p>Race ${k}: ${v}</p>`).join('')}

    <h2>Top Engagement</h2>
    <p>${reportData.top_engagement.join(', ')}</p>

    <h2>Low Engagement Moments</h2>
    <p>${reportData.low_engagement_moments.join(', ')}</p>

    <h2>Trends Over Time</h2>
    <ul>${reportData.trends_over_time.map(t => `<li>${t}</li>`).join('')}</ul>

    <h2>Recommendations</h2>
    <ul>${reportData.recommendations.map(r => `<li>${r}</li>`).join('')}</ul>
  `;

  // Convert the div to canvas
  const canvas = await html2canvas(container, { scale: 2 });
  const imgData = canvas.toDataURL('image/png');

  // Create PDF
  const pdf = new jsPDF('p', 'pt', 'a4');
  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  pdf.save(`${reportData.title.replace(/\s/g, '_')}_${Date.now()}.pdf`);

  // Clean up
  document.body.removeChild(container);
};
export default downloadReport;