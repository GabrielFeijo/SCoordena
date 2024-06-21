'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ComponentPropsWithoutRef } from 'react';

interface NavItemProps extends ComponentPropsWithoutRef<'a'> {}

const NavItem = ({ ...props }: NavItemProps) => {
	const pathname = usePathname();

	const activePath = props.href == pathname;
	return (
		<Link
			href={props.href as string}
			className={`flex items-center  gap-2 font-medium ${
				activePath ? 'text-primary' : 'text-muted-foreground'
			}`}
			{...props}
		/>
	);
};

export default NavItem;
