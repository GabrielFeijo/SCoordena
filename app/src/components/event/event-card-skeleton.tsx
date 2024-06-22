import { Skeleton } from '../ui/skeleton';

const EventCardSkeleton = () => {
	return (
		<>
			{Array.from({ length: 6 }).map((_, i) => {
				return (
					<div
						className='rounded-xl p-4 bg-secondary w-full flex gap-2 justify-between'
						key={i}
					>
						<div className='flex gap-2'>
							<Skeleton className='h-full size-40 rounded bg-card' />
							<div className='space-y-1'>
								<Skeleton className='h-5 w-52 rounded bg-card' />
								<Skeleton className='h-4 w-40 rounded bg-card' />
							</div>
						</div>

						<div className='flex justify-between flex-col'>
							<Skeleton className='h-5 w-20 bg-card' />

							<Skeleton className='h-5 w-20 bg-card' />
						</div>
					</div>
				);
			})}
		</>
	);
};

export default EventCardSkeleton;
