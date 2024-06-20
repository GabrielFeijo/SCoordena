import { Skeleton } from '@/components/ui/skeleton';

export function CardSkeleton() {
	return (
		<>
			<Skeleton className='mt-1 h-7 w-14 bg-card' />
			<Skeleton className='h-4 w-24 bg-card' />
		</>
	);
}
