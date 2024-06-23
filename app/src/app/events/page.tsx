'use client';
import { getEvents } from '@/api/event/get-events';
import EventCard from '@/components/event/event-card';
import EventCardSkeleton from '@/components/event/event-card-skeleton';
import Title from '@/components/title';
import { useQuery } from '@tanstack/react-query';

export default function Page() {
	const { data } = useQuery({
		queryKey: ['get-events'],
		queryFn: getEvents,
	});

	return (
		<div className='space-y-2'>
			<Title>Events</Title>

			<div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
				{data ? (
					data.map((event) => (
						<EventCard
							key={event.id}
							event={event}
						/>
					))
				) : (
					<EventCardSkeleton />
				)}
			</div>
		</div>
	);
}
