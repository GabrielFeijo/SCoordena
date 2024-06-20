import { LogIn, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import NavBar from './navigation/nav-bar';
import { signIn, signOut } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import MenuButton from './button';

const Menu = async () => {
	const session = await getServerSession();
	return (
		<section className='h-full flex flex-col w-fit bg-secondary p-8 rounded-3xl justify-between'>
			<h1 className='font-baloo text-4xl font-bold'>SCoord.</h1>

			<NavBar />

			{session ? (
				<MenuButton btnType='LogOut'>
					<LogOut className='size-4' />
					LogOut
				</MenuButton>
			) : (
				<MenuButton btnType='LogIn'>
					<LogIn className='size-4' />
					LogIn
				</MenuButton>
			)}
		</section>
	);
};

export default Menu;
