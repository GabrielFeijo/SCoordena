'use client';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { CalendarCheck } from 'lucide-react';
import { getLastEvents } from '@/api/get-last-events';
import { formatDistanceToNow } from 'date-fns';
import { Skeleton } from '../ui/skeleton';

const LastEvents = () => {
	const { data, isLoading } = useQuery({
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

				{data ? (
					data?.map((event) => (
						<Link
							key={event.id}
							className='rounded-xl bg-card p-4 my-2 flex  items-center justify-between'
							href={`/event/${event.id}`}
						>
							<div>
								<h4 className='font-medium '>{event.name}</h4>
								<p className='text-sm text-muted-foreground'>
									{formatDistanceToNow(event.date)}
								</p>
							</div>

							<CalendarCheck className='size-6 text-white/70' />
						</Link>
					))
				) : (
					<>
						{Array.from({ length: 4 }).map((_, i) => {
							return (
								<div
									className='flex justify-between items-center space-x-4 bg-card my-2 rounded-xl p-4'
									key={i}
								>
									<div className='space-y-2'>
										<Skeleton className='h-4 w-[250px]' />
										<Skeleton className='h-4 w-[200px]' />
									</div>

									<Skeleton className='size-6' />
								</div>
							);
						})}
					</>
				)}
			</div>
		</div>
	);
};

export default LastEvents;
