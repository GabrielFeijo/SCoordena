/* eslint-disable @next/next/no-img-element */
import Title from '@/components/title';

const events = [
	{
		id: 1,
		name: 'Music Festival',
		description:
			'An annual music festival featuring local and international artists.',
		date: '2022-06-01',
		imageUrl: 'https://via.placeholder.com/100?text=Music+Festival',
	},
	{
		id: 2,
		name: 'Art Exhibition',
		description: 'A gallery showcasing contemporary art from various artists.',
		date: '2022-06-15',
		imageUrl: 'https://via.placeholder.com/100?text=Art+Exhibition',
	},
	{
		id: 3,
		name: 'Tech Conference',
		description:
			'A conference discussing the latest trends in technology and innovation.',
		date: '2022-07-01',
		imageUrl: 'https://via.placeholder.com/100?text=Tech+Conference',
	},
	{
		id: 4,
		name: 'Food Fair',
		description:
			'A fair featuring a variety of food stalls from around the world.',
		date: '2022-07-15',
		imageUrl: 'https://via.placeholder.com/100?text=Food+Fair',
	},
	{
		id: 5,
		name: 'Book Launch',
		description: 'Launch event for the latest book by a bestselling author.',
		date: '2022-08-01',
		imageUrl: 'https://via.placeholder.com/100?text=Book+Launch',
	},
	{
		id: 6,
		name: 'Film Festival',
		description: 'A festival showcasing independent films and documentaries.',
		date: '2022-08-15',
		imageUrl: 'https://via.placeholder.com/100?text=Film+Festival',
	},
	{
		id: 7,
		name: 'Charity Run',
		description: 'A marathon event to raise funds for charity.',
		date: '2022-09-01',
		imageUrl: 'https://via.placeholder.com/100?text=Charity+Run',
	},
	{
		id: 8,
		name: 'Science Expo',
		description:
			'An exhibition showcasing the latest advancements in science and technology.',
		date: '2022-09-15',
		imageUrl: 'https://via.placeholder.com/100?text=Science+Expo',
	},
];

export default function Page() {
	return (
		<div>
			<Title>Events</Title>

			<div className='flex flex-row flex-wrap gap-4'>
				{events.map((event) => (
					<div
						key={event.id}
						className='rounded-xl p-4 bg-secondary w-[30rem]'
					>
						<div className='flex space-y-2 justify-between'>
							<div className='flex gap-2'>
								<img
									src={event.imageUrl}
									alt={event.name}
									className='rounded-xl'
								/>
								<div className='w-full '>
									<h2 className='text-xl font-semibold'>{event.name}</h2>
									<p className='text-sm text-muted-foreground'>
										{event.description}
									</p>
								</div>
							</div>
							<div className='text-sm flex flex-col justify-between'>
								<p className='text-right'>
									{new Date(event.date).toLocaleDateString()}
								</p>

								<div className='flex justify-end items-end w-full relative'>
									{[0, 1, 2, 3].map((i) => (
										<img
											src={'https://via.placeholder.com/40'}
											alt={`User ${i}`}
											key={i}
											className={`rounded-full size-10 border-2 border-primary absolute`}
											style={{ right: `${i * 30}%` }}
										/>
									))}
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
