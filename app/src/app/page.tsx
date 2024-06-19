'use client';
import WelcomeBanner from '@/components/welcome-banner';
import CreateEvent from '@/components/dashboard/create-event';
import CalendarComponent from '@/components/dashboard/calendar-component';
import Card from '@/components/dashboard/card';
import {
	Bar,
	BarChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import LastEvents from '@/components/dashboard/last-events';
import UserComponent from '@/components/dashboard/user-component';

const data = [
	{
		name: 'Page A',
		uv: 4000,
		pv: 2400,
	},
	{
		name: 'Page B',
		uv: 3000,
		pv: 1398,
	},
	{
		name: 'Page C',
		uv: 2000,
		pv: 3800,
	},
	{
		name: 'Page D',
		uv: 2780,
		pv: 3908,
	},
	{
		name: 'Page E',
		uv: 1890,
		pv: 4800,
	},
	{
		name: 'Page F',
		uv: 2390,
		pv: 3800,
	},
	{
		name: 'Page G',
		uv: 3490,
		pv: 4300,
	},
];

export default function Home() {
	return (
		<div className='space-y-4'>
			<div className='grid grid-cols-1 lg:grid-cols-12 gap-4'>
				<div className='lg:col-span-7 space-y-4 flex flex-col'>
					<WelcomeBanner />
				</div>
				<div className='lg:col-span-5 space-y-4'>
					<UserComponent />
					<CreateEvent />
				</div>
			</div>
			<div className='grid grid-cols-1 lg:grid-cols-12 gap-4'>
				<div className='lg:col-span-7 space-y-4'>
					<div className='justify-between gap-4 flex flex-row'>
						<Card
							value={11}
							description={'Hours Worked'}
						/>
						<Card
							value={24}
							description={'Money Paid'}
						/>
						<Card
							value={36}
							description={'Tasks Done'}
						/>
					</div>
					<h2 className='text-2xl'>Your statistics</h2>
					<div className='bg-secondary rounded-xl p-4 h-[calc(100vh-21.5rem)]'>
						<ResponsiveContainer
							width='100%'
							height='100%'
						>
							<BarChart data={data}>
								<XAxis dataKey='name' />
								<YAxis />
								<Tooltip />
								<Bar
									dataKey='pv'
									fill='#8884d8'
								/>
								<Bar
									dataKey='uv'
									fill='#82ca9d'
								/>
							</BarChart>
						</ResponsiveContainer>
					</div>
				</div>
				<div className='lg:col-span-5 space-y-4'>
					<CalendarComponent />
					<LastEvents />
				</div>
			</div>
		</div>
	);
}
