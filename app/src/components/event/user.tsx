import { Registration } from '@/api/event/get-event-by-id';
import AvatarComponent from '../dashboard/avatar';
import { format } from 'date-fns';

const User = ({ registration }: { registration: Registration }) => {
	return (
		<div className='flex items-center  p-2 bg-secondary rounded'>
			<div className='flex items-center'>
				<AvatarComponent
					imageUrl={registration.user.image}
					size='size-8'
				/>
				<div className='ml-2'>
					<p className='font-medium'>{registration.user.name}</p>
					<p className='text-xs text-muted-foreground'>
						{format(registration.createdAt, 'dd/MM/yyyy HH:mm')}
					</p>
				</div>
			</div>
		</div>
	);
};

export default User;
