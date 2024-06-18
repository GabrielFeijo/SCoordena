import { adminNavItems } from '@/utils/nav-items';
import React from 'react';
import NavItem from './nav-item';

const NavBar = () => {
	return (
		<nav>
			<ul className='space-y-10'>
				{adminNavItems.map((item, index) => (
					<li key={index}>
						<NavItem href={item.href}>
							{item.icon}
							<span>{item.label}</span>
						</NavItem>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default NavBar;
