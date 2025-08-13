import React from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,          // for pie/doughnut
    BarElement,          // for bar
    CategoryScale,       // x-axis for bar
    LinearScale,         // y-axis for bar
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    ArcElement,
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend
);

interface DemographicChartProps {
    title: string;
    data: Record<string, number>;
    type?: 'pie' | 'bar';
}

const COLORS = ['#7B00FF', '#D80621', '#FF9F00', '#00B894', '#00A8FF', '#FF2E63'];

const DemographicChart: React.FC<DemographicChartProps> = ({ title, data, type = 'pie' }) => {
    const labels = Object.keys(data);
    const values = Object.values(data);

    const chartData = {
        labels,
        datasets: [
            {
                data: values,
                backgroundColor: labels.map((_, i) => COLORS[i % COLORS.length]),
            }
        ]
    };

    const options = {
        plugins: {
            title: { display: true, text: title, color: '#FFFFFF' },
            legend: {
                display: type !== 'bar',
                position: 'bottom' as const,
                labels: { color: '#FFFFFF' }
            },
            tooltip: {
                callbacks: {
                    label: function (context: any) {
                        const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
                        const value = context.raw;
                        const percent = ((value / total) * 100).toFixed(1);
                        return `${context.label}: ${value} (${percent}%)`;
                    }
                },
                titleColor: '#FFFFFF',
                bodyColor: '#FFFFFF'
            }
        },
        responsive: true,
        maintainAspectRatio: false,
        ...(type === 'bar' ? {
            scales: {
                x: { ticks: { color: '#FFFFFF' } },
                y: { ticks: { color: '#FFFFFF' } }
            }
        } : {})
    };



    return (
        <div style={{ height: 250 }}>
            {type === 'pie' ? (
                <Pie key={`pie-${title}`} data={chartData} options={options} />
            ) : (
                <Bar key={`bar-${title}`} data={chartData} options={options} />
            )}
        </div>
    );
};

export default DemographicChart;