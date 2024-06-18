import Menu from '@/components/dashboard/menu';
import WelcomeBanner from '@/components/welcome-banner';
import { ModeToggle } from '@/components/mode-toogle';
import CreateEvent from '@/components/dashboard/create-event';
import AvatarComponent from '@/components/dashboard/avatar';

export default function Home() {
	return (
		<main className='flex m-4 h-[calc(100vh-2rem)] space-x-4'>
			<Menu />
			<div className='grid grid-cols-1 lg:grid-cols-12 gap-4 w-full h-fit'>
				<div className='lg:col-span-7 space-y-4'>
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
		</main>
	);
}
