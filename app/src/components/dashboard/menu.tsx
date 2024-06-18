import { LogOut } from 'lucide-react';
import { Button } from '../ui/button';
import NavBar from '../navigation/nav-bar';
import { ModeToggle } from '../mode-toogle';

const Menu = () => {
	return (
		<section className='h-full flex flex-col w-fit bg-secondary p-8 rounded-3xl justify-between'>
			<h1 className='font-baloo text-4xl font-bold'>SCoord.</h1>

			<NavBar />

			<Button className='flex gap-2 items-center justify-start bg-transparent text-primary'>
				<LogOut className='size-4' />
				Logout
			</Button>
		</section>
	);
};

export default Menu;
