import Menu from '@/components/dashboard/menu';
import WelcomeBanner from '@/components/welcome-banner';
import { ModeToggle } from '@/components/mode-toogle';
import CreateEvent from '@/components/dashboard/create-event';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Home() {
	return (
		<main className='flex m-6 h-[calc(100vh-3rem)] space-x-6'>
			<Menu />

			<div className='grid grid-cols-12 gap-4'>
				<div className='col-span-7'>
					<WelcomeBanner />
				</div>
				<div className='col-span-5 space-y-4'>
					<div className='flex justify-end space-x-4'>
						<ModeToggle />
						<Avatar>
							<AvatarImage
								src='https://github.com/shadcn.png'
								alt='@shadcn'
							/>
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
					</div>
					<CreateEvent />
				</div>
			</div>
		</main>
	);
}
