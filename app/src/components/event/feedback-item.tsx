import { Feedback } from '@/api/event/get-event-by-id';
import { formatDate } from 'date-fns';
import { Star } from 'lucide-react';
import React from 'react';
import AvatarComponent from '../dashboard/avatar';

interface FeedbackItemProps extends Feedback {}

const FeedbackItem = ({
	user,
	rating,
	comment,
	createdAt,
}: FeedbackItemProps) => {
	const stars = Array.from({ length: rating }, (_, index) => (
		<Star
			key={index}
			className='size-5 fill-current'
		/>
	));

	return (
		<div className='bg-secondary p-4 rounded my-2'>
			<div className='flex justify-between'>
				<div className='flex gap-2 items-center'>
					<AvatarComponent
						imageUrl={user.image}
						size='size-6'
					/>
					<h4 className='text-base font-medium'>{user.name}</h4>
				</div>
				<div className='flex gap-1 items-center text-xs text-muted-foreground'>
					{stars}
				</div>
			</div>
			<p className='text-sm mt-2'>{comment}</p>

			<p className='text-xs text-muted-foreground text-right'>
				{formatDate(createdAt, 'dd/MM/yyyy HH:mm')}
			</p>
		</div>
	);
};

export default FeedbackItem;
