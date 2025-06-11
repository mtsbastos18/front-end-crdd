"use client";

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
    },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Revenue',
            data: [4000, 3000, 6000, 2000, 8000, 7000, 9000],
            backgroundColor: 'rgba(14, 165, 233, 0.8)',
        },
        {
            label: 'Expenses',
            data: [2000, 4000, 3000, 1000, 5000, 4000, 3000],
            backgroundColor: 'rgba(203, 213, 225, 0.8)',
        },
    ],
};

export default function BarChart() {
    return <Bar options={options} data={data} />;
}