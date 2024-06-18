import { LogOut } from 'lucide-react';
import { Button } from '../ui/button';
import NavBar from '../navigation/nav-bar';

const Menu = () => {
	return (
		<section className='h-[calc(100vh-3rem)] flex flex-col w-fit bg-secondary-foreground text-secondary p-8 m-6 rounded-3xl justify-between'>
			<h1 className='font-baloo text-4xl font-bold'>SCoord.</h1>

			<NavBar />

			<Button className='flex gap-2 items-center justify-start'>
				<LogOut className='size-4' />
				Logout
			</Button>
		</section>
	);
};

export default Menu;
