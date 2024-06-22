'use client';
import React from 'react';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

import { ResponsiveContainer } from 'recharts';
import { useTheme } from 'next-themes';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

const labels = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

export const data = {
	labels,
	datasets: [
		{
			label: 'Number of Events',
			data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
			backgroundColor: 'rgba(53, 162, 235, 0.5)',
		},
	],
};

const DataChart = () => {
	const { theme } = useTheme();

	const color = theme === 'dark' ? '#fff' : '#000';

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: 'top' as const,
				labels: {
					color,
				},
			},
			title: {
				display: true,
				text: 'Events per month',
				color,
			},
		},
		scales: {
			x: {
				ticks: {
					color,
				},
			},
			y: {
				ticks: {
					color,
				},
			},
		},
	};

	return (
		<ResponsiveContainer
			width='100%'
			height='100%'
		>
			<Bar
				options={options}
				data={data}
			/>
		</ResponsiveContainer>
	);
};

export default DataChart;
