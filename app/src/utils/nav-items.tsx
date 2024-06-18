import { BarChart, CalendarRange, Home, Settings, Users } from 'lucide-react';

const userNavItems = [
	{
		href: '/',
		icon: <Home className='size-5' />,
		label: 'Dashboard',
	},
	{
		href: '/statistics',
		icon: <BarChart className='size-5' />,
		label: 'Statistics',
	},
];

const adminNavItems = [
	{
		href: '/',
		icon: <Home className='size-5' />,
		label: 'Dashboard',
	},
	{
		href: '/events',
		icon: <CalendarRange className='size-5' />,
		label: 'Events',
	},
	{
		href: '/team',
		icon: <Users className='size-5' />,
		label: 'Team',
	},
	{
		href: '/settings',
		icon: <Settings className='size-5' />,
		label: 'Settings',
	},
];

export { userNavItems, adminNavItems };
