'use client';
import { useQuery } from '@tanstack/react-query';
import { Loader2, Ticket, Users } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { CardSkeleton } from './card-skeleton';
import { getTotalEvents } from '@/api/get-total-events';

export function TotalEvents() {
	const { data, isFetching: isLoading } = useQuery({
		queryKey: ['metrics', 'total-events'],
		queryFn: getTotalEvents,
	});

	return (
		<Card className='bg-secondary w-full'>
			<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2 gap-2'>
				<CardTitle className='text-base font-semibold'>Events</CardTitle>
				{isLoading ? (
					<Loader2 className='size-4 animate-spin text-muted-foreground' />
				) : (
					<Ticket className='size-4 text-muted-foreground' />
				)}
			</CardHeader>
			<CardContent className='space-y-1'>
				{data ? (
					<>
						<span className='text-2xl font-bold'>{data.total}</span>

						<p className='text-xs text-muted-foreground'>
							<span
								className={`${
									data.difference > 0 ? 'text-emerald-500' : 'text-red-500'
								}`}
							>
								{data.difference > 0 ? `+${data.difference}` : data.difference}
							</span>{' '}
							last month
						</p>
					</>
				) : (
					<CardSkeleton />
				)}
			</CardContent>
		</Card>
	);
}
