import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { CalendarCheck } from 'lucide-react';
import { getLastEvents } from '@/api/get-last-events';
import { formatDistanceToNow } from 'date-fns';

const LastEvents = () => {
	const { data } = useQuery({
		queryKey: ['get-last-events'],
		queryFn: getLastEvents,
	});

	return (
		<div className='bg-secondary p-4 rounded-xl '>
			<div className='h-[calc(100vh-38.5rem)] overflow-y-auto scroll-'>
				<h3 className='text-lg font-semibold'>Last Events</h3>
				<p className='text-sm text-muted-foreground'>
					This is where you can see your last events
				</p>

				{data?.map((event) => (
					<Link
						key={event.id}
						className='rounded-xl bg-card p-4 my-2 flex  items-center justify-between'
						href={`/events/${event.id}`}
					>
						<div>
							<h4 className='font-medium '>{event.name}</h4>
							<p className='text-sm text-muted-foreground'>
								{formatDistanceToNow(event.date)}
							</p>
						</div>

						<CalendarCheck className='size-6 text-white/70' />
					</Link>
				))}
			</div>
		</div>
	);
};

export default LastEvents;
