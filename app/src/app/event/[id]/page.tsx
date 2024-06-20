'use client';
import { getEventById } from '@/api/get-event-by-id';
import AvatarComponent from '@/components/dashboard/avatar';
import User from '@/components/event/user';
import { useQuery } from '@tanstack/react-query';
import { format, formatDate } from 'date-fns';

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
							className='h-[15rem] w-full bg-cover bg-center rounded-xl'
						/>
						<div className='flex items-center justify-between'>
							<h1 className='text-3xl font-medium my-2'>{event?.name}</h1>
							<h2 className='text-lg'>{format(event?.date, 'dd/MM/yyyy')}</h2>
						</div>

						<p className='text-lg text-muted-foreground'>
							{event?.description}
						</p>
					</div>
					<div>
						<h3 className='text-xl font-medium'>Participants</h3>
						<p className='text-sm text-muted-foreground'>
							Here is the list of participants
						</p>

						<div className='grid grid-cols-1 lg:grid-cols-5 gap-2 my-2'>
							{event?.registrations.map((registration) => (
								<User
									registration={registration}
									key={registration.id}
								/>
							))}
						</div>
					</div>

					<div>
						<h3 className='text-xl font-medium'>Feedbacks</h3>
						<p className='text-sm text-muted-foreground'>
							Here is a collection of feedback provided by the participants
						</p>
					</div>
				</div>
			)}
		</>
	);
};

export default Page;
