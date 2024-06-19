'use client';
import { LogIn, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import NavBar from './navigation/nav-bar';
import { signIn, signOut, useSession } from 'next-auth/react';

const Menu = () => {
	const { data } = useSession();
	return (
		<section className='h-full flex flex-col w-fit bg-secondary p-8 rounded-3xl justify-between'>
			<h1 className='font-baloo text-4xl font-bold'>SCoord.</h1>

			<NavBar />

			{data?.user ? (
				<Button
					className='flex gap-2 items-center justify-start bg-transparent text-primary'
					onClick={() => signOut()}
					variant={'outline'}
				>
					<LogOut className='size-4' />
					LogOut
				</Button>
			) : (
				<Button
					className='flex gap-2 items-center justify-start bg-transparent text-primary'
					onClick={() => signIn('google')}
					variant={'outline'}
				>
					<LogIn className='size-4' />
					LogIn
				</Button>
			)}
		</section>
	);
};

export default Menu;
