import Menu from '@/components/dashboard/menu';
import WelcomeBanner from '@/components/welcome-banner';
import { ModeToggle } from '@/components/mode-toogle';
import CreateEvent from '@/components/dashboard/create-event';
import AvatarComponent from '@/components/dashboard/avatar';
import CalendarComponent from '@/components/dashboard/calendar-component';
import Card from '@/components/dashboard/card';

export default function Home() {
	return (
		<main className='m-4 space-x-4'>
			<div className='fixed h-[calc(100vh-2rem)] top-4 left-4'>
				<Menu />
			</div>
			<div className='space-y-4 w-[calc(100%-13rem)] !ml-auto'>
				<div className='grid grid-cols-1 lg:grid-cols-12 gap-4'>
					<div className='lg:col-span-7 space-y-4 flex flex-col'>
						<WelcomeBanner />
					</div>
					<div className='lg:col-span-5 space-y-4'>
						<div className='flex space-x-4'>
							<p className='w-full text-xl font-semibold'>
								Here is your dashboard, Gabriel
							</p>
							<ModeToggle />
							<AvatarComponent />
						</div>
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
						<h2 className='text-2xl '>Your statistics</h2>
					</div>
					<div className='lg:col-span-5 space-y-4'>
						<CalendarComponent />
						<CalendarComponent />
						<CalendarComponent />
						<CalendarComponent />
					</div>
				</div>
			</div>
		</main>
	);
}
