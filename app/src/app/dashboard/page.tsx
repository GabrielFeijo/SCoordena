import WelcomeBanner from '@/components/welcome-banner';
import CreateEvent from '@/components/dashboard/create-event';
import CalendarComponent from '@/components/dashboard/calendar-component';

import LastEvents from '@/components/dashboard/last-events';
import UserComponent from '@/components/dashboard/user-component';
import DataChart from '@/components/dashboard/data-chart';
import { TotalUsers } from '@/components/dashboard/total-users';
import { TotalEvents } from '@/components/dashboard/total-events';
import { TotalFeedbacks } from '@/components/dashboard/total-feedbacks';

const page = () => {
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
						<TotalUsers />
						<TotalEvents />
						<TotalFeedbacks />
					</div>
					<h2 className='text-2xl'>Your statistics</h2>
					<div className='bg-secondary rounded-xl p-4 h-[calc(100vh-24rem)]'>
						<DataChart />
					</div>
				</div>
				<div className='lg:col-span-5 space-y-4'>
					<CalendarComponent />
					<LastEvents />
				</div>
			</div>
		</div>
	);
};

export default page;
