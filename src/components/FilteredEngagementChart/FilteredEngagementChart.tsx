import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface FilteredEngagementChartProps {
  data: Record<string, number[]> | number[]; // either categorical or single array
  label: string;
}

const COLORS: string[] = ['#7B00FF', '#D80621', '#FF9F00', '#00B894', '#00A8FF', '#FF2E63'];
const getColor = (index: number) => COLORS[index % COLORS.length];

const FilteredEngagementChart: React.FC<FilteredEngagementChartProps> = ({ data, label }) => {
  const isCategorical = !Array.isArray(data);
  const categories = isCategorical ? Object.keys(data) : ['overall'];
  const [selected, setSelected] = useState<string[]>(categories);

  const toggleCategory = (category: string) => {
    setSelected(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const totalSeconds = isCategorical
    ? data[categories[0]].length
    : (data as number[]).length;

  const chartData = {
    labels: Array.from({ length: totalSeconds }, (_, i) => (i / 60).toFixed(1)), // all points
    datasets: selected.map((cat, idx) => ({
      label: cat,
      data: isCategorical ? (data as Record<string, number[]>)[cat] : (data as number[]),
      borderColor: getColor(idx),
      backgroundColor: getColor(idx) + '20',
      tension: 0.3,
      fill: true
    }))
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true, labels: { color: '#FFFFFF' } },
      title: { display: true, text: label, color: '#FFFFFF' }
    },
    scales: {
      y: { min: 0, max: 100, ticks: { color: '#FFFFFF' }, grid: { color: '#555' } },
      x: {
        title: { display: true, text: 'Minutes', color: '#FFFFFF' },
        ticks: {
          color: '#FFFFFF', callback: (val: any, index: number) => {
            const step = totalSeconds > 3600 ? 120 : totalSeconds > 1800 ? 60 : 30;
            return index % step === 0 ? (index / 60).toFixed(1) : '';
          }
        },
        grid: { color: '#555' }
      }
    }
  };


  return (
    <div>
      {isCategorical && (
        <div className="checkbox-group" style={{ marginBottom: '1rem' }}>
          {categories.map((cat, idx) => (
            <label key={cat} style={{ marginRight: '1rem', color: getColor(idx) }}>
              <input
                type="checkbox"
                checked={selected.includes(cat)}
                onChange={() => toggleCategory(cat)}
              />
              {cat}
            </label>
          ))}
        </div>
      )}
      <Line data={chartData} options={options} />
    </div>
  );
};

export default FilteredEngagementChart;