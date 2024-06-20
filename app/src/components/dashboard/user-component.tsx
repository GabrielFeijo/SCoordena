import { ModeToggle } from '../mode-toogle';
import AvatarComponent from './avatar';
import { getServerSession } from 'next-auth';

const UserComponent = async () => {
	const session = await getServerSession();

	return (
		<div className='flex items-center space-x-4'>
			<p className='w-full xl:text-xl lg:text-base md:text-xs text-xs font-semibold !whitespace-nowrap'>
				Here is your, {session?.user?.name?.split(' ')[0] || 'Anonymous'}
			</p>
			<ModeToggle />
			<AvatarComponent imageUrl={session?.user?.image} />
		</div>
	);
};

export default UserComponent;
