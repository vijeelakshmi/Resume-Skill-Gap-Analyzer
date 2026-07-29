// frontend/src/components/dashboard/SkillChart.jsx
import React, { useEffect, useRef } from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';
import { useAnalysis } from '../../hooks/useAnalysis';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const SkillChart = () => {
  const { currentAnalysis } = useAnalysis();
  const chartRef = useRef(null);

  if (!currentAnalysis || !currentAnalysis.categorized || currentAnalysis.categorized.length === 0) {
    return <p>No data to display. Complete an analysis first.</p>;
  }

  // Take top 8 skills for radar
  const skills = currentAnalysis.categorized.slice(0, 8).map(s => s.name);
  const userData = currentAnalysis.categorized.slice(0, 8).map(s => s.proficiency);
  const requiredData = currentAnalysis.categorized.slice(0, 8).map(() => 85);

  const data = {
    labels: skills,
    datasets: [
      {
        label: 'Your Skills',
        data: userData,
        backgroundColor: 'rgba(67, 97, 238, 0.2)',
        borderColor: 'rgba(67, 97, 238, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(67, 97, 238, 1)'
      },
      {
        label: 'Required Level',
        data: requiredData,
        backgroundColor: 'rgba(114, 9, 183, 0.2)',
        borderColor: 'rgba(114, 9, 183, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(114, 9, 183, 1)'
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: { stepSize: 20, backdropColor: 'transparent' },
        grid: { color: 'rgba(0,0,0,0.1)' }
      }
    },
    plugins: {
      legend: { position: 'top' },
      tooltip: { callbacks: { label: (ctx) => `${ctx.dataset.label}: ${ctx.raw}%` } }
    }
  };

  return (
    <div style={{ width: '100%', height: '350px' }}>
      <Radar ref={chartRef} data={data} options={options} />
    </div>
  );
};

export default SkillChart;