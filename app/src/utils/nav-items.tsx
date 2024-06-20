import {
	CalendarRange,
	Home,
	HomeIcon,
	LayoutDashboard,
	Settings,
	Users,
} from 'lucide-react';

const userNavItems = [
	{
		href: '/',
		icon: <Home className='size-5' />,
		label: 'Home',
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

const adminNavItems = [
	{
		href: '/',
		icon: <HomeIcon className='size-5' />,
		label: 'Home',
	},
	{
		href: '/dashboard',
		icon: <LayoutDashboard className='size-5' />,
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
