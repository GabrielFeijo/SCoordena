import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import FormField from '../event/form-field';
import { Textarea } from '../ui/textarea';
import { Event, Schedule } from '@/api/event/get-event-schedule';

import { z } from 'zod';
import { toast } from 'sonner';
import { updateScheduleItemById } from '@/api/schedule/update-schedule-item';
import { useQueryClient } from '@tanstack/react-query';
import { createScheduleItem } from '@/api/schedule/create-schedule-item';

const formSchema = z.object({
	title: z.string().min(1, 'Event name is required'),
	description: z.string().min(1, 'Event description is required'),
	startTime: z.string().min(1, 'Event start time is required'),
	endTime: z.string().min(1, 'Event end time is required'),
});

export function CardWithForm({
	eventId,
	setEventIdToEdit,
	defaultValues,
}: {
	eventId: string;
	setEventIdToEdit: React.Dispatch<React.SetStateAction<string | undefined>>;
	defaultValues?: Schedule;
}) {
	const queryClient = useQueryClient();

	const saveData = async (formData: FormData) => {
		const data = Object.fromEntries(formData);

		const validatedFields = formSchema.safeParse(data);

		if (!validatedFields.success) {
			toast.error('Invalid fields');
			return {
				errors: validatedFields.error.flatten().fieldErrors,
			};
		}

		if (!defaultValues) {
			const response = await createScheduleItem({
				eventId,
				...validatedFields.data,
			});

			queryClient.setQueryData(
				['get-event-schedule-item', eventId],
				(oldData: Event) => {
					return {
						...oldData,
						schedule: [response, ...oldData.schedule],
					};
				}
			);
		} else {
			const response = await updateScheduleItemById(
				defaultValues.id as string,
				{
					...validatedFields.data,
				}
			);

			queryClient.setQueryData(
				['get-event-schedule-item', eventId],
				(oldData: Event) => {
					const data = {
						...oldData,
						schedule: oldData.schedule.map((item) => {
							if (item.id === response.id) {
								return response;
							}

							return item;
						}),
					};

					return data;
				}
			);
		}

		setEventIdToEdit(undefined);

		toast.success('Schedule item saved successfully!');
	};

	return (
		<div className='flex items-center justify-center fixed top-0 left-0 backdrop-blur-sm bg-muted/10 w-full h-full'>
			<Card className='w-[500px]'>
				<CardHeader>
					<CardTitle>Schedule Item</CardTitle>
					<CardDescription>Create/edit a new schedule item</CardDescription>
				</CardHeader>
				<CardContent>
					<form
						className='space-y-4'
						action={saveData}
					>
						<FormField
							name='title'
							label='Event Name'
							description='Enter the name of the event.'
						>
							<Input
								type='text'
								id='title'
								name='title'
								placeholder='Chess Tournament'
								defaultValue={defaultValues?.title}
							/>
						</FormField>
						<FormField
							name='description'
							label='Event Description'
							description='Provide a detailed description of the event.'
						>
							<Textarea
								id='description'
								name='description'
								placeholder='Detailed description of the event...'
								className='resize-none'
								defaultValue={defaultValues?.description as string}
							/>
						</FormField>

						<div className='flex w-full gap-2'>
							<FormField
								name='startTime'
								label='Start Time'
								description='Select the start time of the event.'
							>
								<Input
									type='time'
									id='startTime'
									name='startTime'
									defaultValue={defaultValues?.startTime}
								/>
							</FormField>
							<FormField
								name='endTime'
								label='End Time'
								description='Select the end time of the event.'
							>
								<Input
									type='time'
									id='endTime'
									name='endTime'
									defaultValue={defaultValues?.endTime}
								/>
							</FormField>
						</div>

						<div className='flex justify-between'>
							<Button
								variant='outline'
								onClick={() => setEventIdToEdit(undefined)}
							>
								Cancel
							</Button>
							<Button type='submit'>Save</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
