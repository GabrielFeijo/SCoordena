'use client';
import { getUserEvents } from '@/api/event/get-user-events';
import EventCard from '@/components/event/event-card';
import EventCardSkeleton from '@/components/event/event-card-skeleton';
import Title from '@/components/title';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

export default function Page() {
	const { data: session } = useSession();

	const { data } = useQuery({
		queryKey: ['get-user-events'],
		queryFn: async () => {
			if (session?.user.id) {
				return getUserEvents({
					userId: session.user.id as string,
				});
			}
		},
		enabled: !!session,
	});

	return (
		<div className='space-y-2'>
			<Title>My Events</Title>

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
