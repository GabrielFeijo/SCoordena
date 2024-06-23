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
import { getEventsPerMonth } from '@/api/metric/get-events-per-month';
import { Skeleton } from '../ui/skeleton';

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
		<>
			{data ? (
				<ResponsiveContainer
					width='100%'
					height='100%'
				>
					<Bar
						options={options}
						data={chartData}
					/>
				</ResponsiveContainer>
			) : (
				<div className='w-full h-full gap-2 flex flex-col'>
					<Skeleton className='w-40 h-5 bg-card m-auto' />
					<Skeleton className='w-60 h-5 bg-card m-auto' />
					<div className='flex flex-1 flex-row gap-2'>
						{Array.from({ length: 5 }).map((_, i) => (
							<Skeleton
								className='h-full w-full rounded bg-card'
								key={i}
							/>
						))}
					</div>
				</div>
			)}
		</>
	);
};

export default DataChart;
