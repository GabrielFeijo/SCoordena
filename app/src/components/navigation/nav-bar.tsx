import { adminNavItems, userNavItems } from '@/utils/nav-items';
import NavItem from './nav-item';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const NavBar = async () => {
	const session = await getServerSession(authOptions);

	if (!session) {
		return null;
	}

	const navItem = session.user.role === 'ADMIN' ? adminNavItems : userNavItems;

	return (
		<nav>
			<ul className='space-y-10'>
				{navItem.map((item, index) => (
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
