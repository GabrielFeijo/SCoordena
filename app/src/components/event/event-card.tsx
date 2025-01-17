/* eslint-disable @next/next/no-img-element */
import { Event } from '@/api/event/get-events';
import truncateText from '@/utils/truncate-text-';
import { formatDate } from 'date-fns';
import Link from 'next/link';

const EventCard = ({ event }: { event: Event }) => {
	return (
		<Link
			className='rounded-xl p-4 bg-secondary w-full min-w-96'
			href={`/event/${event.id}`}
		>
			<div className='flex space-y-2 justify-between'>
				<div className='flex gap-2'>
					<div
						style={{
							backgroundImage: `url(${event.image})`,
						}}
						className=' min-w-36 min-h-36 rounded bg-cover bg-center bg-no-repeat'
					/>

					<div className='w-full '>
						<h2 className='text-xl font-semibold'>{event.name}</h2>
						{event.description && (
							<p className='text-sm text-muted-foreground'>
								{truncateText({ text: event.description, maxWords: 5 })}
							</p>
						)}
					</div>
				</div>
				<div className='text-sm flex flex-col justify-between'>
					<p className='text-right'>
						{formatDate(new Date(event.date), 'dd/MM/yyyy')}
					</p>

					<div className='flex justify-end items-end w-full relative'>
						{event.registrations && event.registrations?.length > 0 ? (
							event.registrations.slice(0, 5).map((registration, i) => (
								<img
									src={registration.user.image}
									alt={registration.user.name}
									key={registration.id}
									className={`rounded-full size-10 border-2 border-primary absolute`}
									style={{ right: `${i * 30}%` }}
								/>
							))
						) : (
							<p className='text-right text-xs text-muted-foreground'>
								No participants
							</p>
						)}
					</div>
				</div>
			</div>
		</Link>
	);
};

export default EventCard;
