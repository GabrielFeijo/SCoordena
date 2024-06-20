'use client';

import { signIn, signOut } from 'next-auth/react';
import { Button } from './ui/button';
import { ComponentPropsWithoutRef } from 'react';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
	btnType: 'LogIn' | 'LogOut';
}

const MenuButton = ({ btnType, ...props }: ButtonProps) => {
	return (
		<Button
			className='flex gap-2 items-center justify-start bg-transparent text-primary'
			variant={'outline'}
			onClick={() => {
				btnType === 'LogIn'
					? signIn('google')
					: signOut({ callbackUrl: '/', redirect: true });
			}}
			{...props}
		/>
	);
};

export default MenuButton;
