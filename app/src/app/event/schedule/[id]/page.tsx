'use client';
import { deleteScheduleItemById } from '@/api/delete-schedule-item';
import { Event } from '@/api/get-event-by-id';
import { getEventSchedule } from '@/api/get-event-schedule';
import Section from '@/components/event/section';
import { CardWithForm } from '@/components/schedule/card-w-form';
import Title from '@/components/title';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Clock9, Pencil, Plus, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';

const Page = ({ params }: { params: { id: string } }) => {
	const queryClient = useQueryClient();

	const [eventIdToDelete, setEventIdToDelete] = useState<string>();
	const [eventIdToEdit, setEventIdToEdit] = useState<string>();

	const { data: event } = useQuery({
		queryKey: ['get-event-schedule-item', params.id],
		queryFn: () => getEventSchedule(params.id),
	});

	const deleteScheduleItem = async () => {
		if (!eventIdToDelete) return;

		const response = await deleteScheduleItemById(eventIdToDelete);

		queryClient.setQueryData(
			['get-event-schedule-item', params.id],
			(oldData: Event) => {
				const data = {
					...oldData,
					schedule: oldData.schedule.filter((item) => item.id !== response.id),
				};

				return data;
			}
		);

		setEventIdToDelete(undefined);

		toast.success('Schedule item has been deleted.');
	};

	return (
		<div className='relative'>
			{eventIdToEdit && (
				<CardWithForm
					eventId={params.id}
					setEventIdToEdit={setEventIdToEdit}
					defaultValues={
						eventIdToEdit === 'new'
							? undefined
							: event?.schedule.find((item) => item.id === eventIdToEdit)
					}
				/>
			)}

			<Title>Event Schedule</Title>

			<Button
				onClick={() => setEventIdToEdit('new')}
				className='my-4'
			>
				Create New Schedule Item
				<Plus className='size-5 ml-2' />
			</Button>

			<Section
				title='Schedule'
				description='Below is the schedule for the event, including the dates and times
							for each session.'
				icon={<Clock9 className='size-4 text-muted-foreground' />}
			>
				<div className='grid grid-cols-2 lg:grid-cols-3 gap-2 my-2 mt-4'>
					{event ? (
						event.schedule.map((item) => (
							<div
								className='bg-secondary p-4 rounded flex justify-between items-center'
								key={item.id}
							>
								<h4 className='text-lg font-medium'>{item.title}</h4>
								<div className='gap-4 flex items-center'>
									<Button
										variant='outline'
										className='p-0 h-fit bg-transparent'
										onClick={() => setEventIdToEdit(item.id)}
									>
										<Pencil className='text-muted-foreground size-5' />
									</Button>
									<Button
										variant='outline'
										className='p-0 h-fit bg-transparent'
										onClick={() => setEventIdToDelete(item.id)}
									>
										<Trash className='text-muted-foreground size-5' />
									</Button>
								</div>
							</div>
						))
					) : (
						<div className='space-y-4'>
							<Skeleton className='w-full h-14' />
						</div>
					)}
				</div>
			</Section>

			<AlertDialog
				open={!!eventIdToDelete}
				onOpenChange={() => setEventIdToDelete(undefined)}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
						<AlertDialogDescription>
							This action cannot be undone. This will permanently delete the
							event.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction onClick={deleteScheduleItem}>
							Continue
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
};

export default Page;
