'use client';
import { getEventById } from '@/api/get-event-by-id';
import AvatarComponent from '@/components/dashboard/avatar';
import FeedbackItem from '@/components/event/feedback-item';
import ScheduleItem from '@/components/event/schedule-item';
import Section from '@/components/event/section';
import User from '@/components/event/user';
import { ModeToggle } from '@/components/mode-toogle';
import { useQuery } from '@tanstack/react-query';
import { format, formatDate } from 'date-fns';
import { Clock9, MapPin, MessageSquare, Users } from 'lucide-react';

const Page = ({ params }: { params: { id: string } }) => {
	const { data: event } = useQuery({
		queryKey: ['get-event'],
		queryFn: () => getEventById(params.id),
	});

	// {
	// 	id: 'clxm89yjj000etj16j2uyhb0q',
	// 	name: 'Event Name',
	// 	description: 'Event Description',
	// 	image: 'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg',
	// 	date: '2024-05-01T03:00:00.000Z',
	// 	location: 'Event Location',
	// 	organizerId: 'clxm6mut50000tj1661i5z68l',
	// 	createdAt: '2024-06-19T19:30:20.575Z',
	// 	updatedAt: '2024-06-20T20:41:56.128Z',
	// 	organizer: {
	// 	  id: 'clxm6mut50000tj1661i5z68l',
	// 	  name: 'Gabriel Silva',
	// 	  image:
	// 		'https://lh3.googleusercontent.com/a/ACg8ocKeUEPbnc3yBMFSqn8zm5qEigQ7I4VtFrmrjJbrqcYIXo7gDg=s96-c'
	// 	},
	// 	registrations: [],
	// 	feedbacks: [],
	// 	schedule: []
	//   }

	return (
		<>
			{event && (
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
						<div className='flex items-center justify-between'>
							<h1 className='text-3xl font-medium my-2'>{event?.name}</h1>
							<h2 className='text-lg'>{format(event?.date, 'dd/MM/yyyy')}</h2>
						</div>

						<p className='text-lg text-muted-foreground'>
							{event?.description}
						</p>
					</div>

					<hr />

					<Section
						title='Location'
						description='Here is the location of the event'
						icon={<MapPin className='size-4 text-muted-foreground' />}
					>
						<p className='text-base font-medium'>{event?.location}</p>
					</Section>

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
			)}
		</>
	);
};

export default Page;
