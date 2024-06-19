import { useSession } from 'next-auth/react';
import { ModeToggle } from '../mode-toogle';
import AvatarComponent from './avatar';

const UserComponent = () => {
	const { data } = useSession();

	return (
		<div className='flex items-center space-x-4'>
			<p className='w-full xl:text-xl lg:text-base md:text-xs text-xs font-semibold !whitespace-nowrap'>
				Here is your dashboard, {data?.user?.name?.split(' ')[0] || 'Anonymous'}
			</p>
			<ModeToggle />
			<AvatarComponent imageUrl={data?.user?.image} />
		</div>
	);
};

export default UserComponent;
