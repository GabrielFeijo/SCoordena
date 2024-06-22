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

import { ResponsiveContainer } from 'recharts';
import { useTheme } from 'next-themes';
import { useQuery } from '@tanstack/react-query';
import { getEventsPerMonth } from '@/api/get-events-per-month';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

export const DataChart = () => {
	const { theme } = useTheme();

	const color = theme === 'dark' ? '#fff' : '#000';

	const { data } = useQuery({
		queryKey: ['get-events-per-month'],
		queryFn: () => getEventsPerMonth(),
	});

	const months = data?.map((item) => item.month);
	const eventsCount = data?.map((item) => item.eventCount);

	const chartData = {
		labels: months,
		datasets: [
			{
				label: 'Number of Events',
				data: eventsCount,
				backgroundColor: 'rgba(53, 162, 235, 0.5)',
			},
		],
	};

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
			{data ? (
				<Bar
					options={options}
					data={chartData}
				/>
			) : (
				<></>
			)}
		</ResponsiveContainer>
	);
};

export default DataChart;
