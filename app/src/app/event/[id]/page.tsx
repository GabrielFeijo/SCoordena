'use client';
import { getEventById } from '@/api/get-event-by-id';
import EventAdminActions from '@/components/event/event-admin-actions';
import EventUserActions from '@/components/event/event-user-actions';
import FeedbackForm from '@/components/event/feedback-form';
import FeedbackItem from '@/components/event/feedback-item';
import ScheduleItem from '@/components/event/schedule-item';
import Section from '@/components/event/section';
import User from '@/components/event/user';
import { ModeToggle } from '@/components/mode-toogle';
import { Skeleton } from '@/components/ui/skeleton';

import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Clock9, MapPin, MessageSquare, Shield, Users } from 'lucide-react';

const Page = ({ params }: { params: { id: string } }) => {
	const { data: event } = useQuery({
		queryKey: ['get-event'],
		queryFn: () => getEventById(params.id),
	});

	return (
		<>
			{event ? (
				<div className='space-y-4'>
					<div>
						<div
							style={{ backgroundImage: `url(${event?.image})` }}
							className='h-[15rem] w-full bg-cover bg-center rounded-xl relative'
						>
							<div className='absolute top-4 right-4 border border-primary rounded'>
								<ModeToggle />
							</div>
						</div>

						<EventUserActions
							id={params.id}
							registrations={event.registrations}
						/>
						<EventAdminActions id={params.id} />

						<div className='flex items-center justify-between mt-4'>
							<h1 className='text-3xl font-medium'>{event?.name}</h1>
							<h2 className='text-lg'>{format(event?.date, 'dd/MM/yyyy')}</h2>
						</div>

						<p className='text-lg text-muted-foreground'>
							{event?.description}
						</p>
					</div>

					<hr />

					<div className='flex justify-between'>
						<Section
							title='Location'
							description='Here is the location of the event'
							icon={<MapPin className='size-4 text-muted-foreground' />}
						>
							<p className='text-base font-medium'>{event?.location}</p>
						</Section>

						<Section
							title='Organizer'
							description='Here is the organizer of the event'
							icon={<Shield className='size-4 text-muted-foreground' />}
							className='text-right ml-auto flex-row-reverse'
						>
							<p className='text-base font-medium text-right'>
								{event?.organizer.name}
							</p>
						</Section>
					</div>

					<hr />

					<Section
						title='Schedule'
						description='Below is the schedule for the event, including the dates and times
							for each session.'
						icon={<Clock9 className='size-4 text-muted-foreground' />}
					>
						<div className='grid grid-cols-1 lg:grid-cols-5 gap-2 my-2'>
							{event?.schedule.map((item) => (
								<ScheduleItem
									key={item.id}
									{...item}
								/>
							))}
						</div>
					</Section>

					<hr />

					<Section
						title='Participants'
						description='Here is the list of participants'
						icon={<Users className='size-4 text-muted-foreground' />}
					>
						<div className='grid grid-cols-1 lg:grid-cols-5 gap-2 my-2'>
							{event?.registrations.map((registration) => (
								<User
									registration={registration}
									key={registration.id}
								/>
							))}
						</div>
					</Section>

					<hr />

					<FeedbackForm eventId={params.id} />

					<Section
						title='Feedbacks'
						description='Here is a collection of feedback provided by the participants'
						icon={<MessageSquare className='size-4 text-muted-foreground' />}
					>
						{event?.feedbacks.map((feedback) => (
							<FeedbackItem
								key={feedback.id}
								{...feedback}
							/>
						))}
					</Section>
				</div>
			) : (
				<div className='space-y-4'>
					<Skeleton className='w-full h-[15rem]' />

					<div className='space-y-2'>
						<div className='flex justify-between'>
							<Skeleton className='w-56 h-6' />
							<Skeleton className='w-56 h-6' />
						</div>
						<Skeleton className='w-28 h-6' />
					</div>

					{Array.from({ length: 5 }).map((_, index) => (
						<>
							<hr />
							<Skeleton
								key={index}
								className='w-full h-24'
							/>
						</>
					))}
				</div>
			)}
		</>
	);
};

export default Page;
