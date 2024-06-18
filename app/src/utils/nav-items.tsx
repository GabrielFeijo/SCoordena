import { BarChart, Home, Settings, Users } from 'lucide-react';

const navItems = [
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

export default navItems;
