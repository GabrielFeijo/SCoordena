import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import FormField from './form-field';
import { Textarea } from '../ui/textarea';

import { z } from 'zod';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { formatDate } from 'date-fns';
import { Event } from '@/api/event/get-event-by-id';
import { updateEvent } from '@/api/event/update-event';

const schema = z.object({
	name: z.string().min(1, { message: 'Name is required' }),
	description: z.string().optional(),
	image: z.string().optional(),
	date: z
		.string()
		.min(1, { message: 'Date is required' })
		.transform((value) => new Date(value + 'T00:00:00')),
	location: z.string().min(1, { message: 'Location is required' }),
});
export function EditEventForm({
	eventId,
	setEventIdToEdit,
	defaultValues,
}: {
	eventId: string;
	setEventIdToEdit: React.Dispatch<React.SetStateAction<string | undefined>>;
	defaultValues: Event;
}) {
	const queryClient = useQueryClient();

	const editEvent = async (formData: FormData) => {
		const data = Object.fromEntries(formData);

		const validatedFields = schema.safeParse(data);

		if (!validatedFields.success) {
			toast.error('Invalid fields');
			return {
				errors: validatedFields.error.flatten().fieldErrors,
			};
		}

		const response = await updateEvent(eventId, {
			...validatedFields.data,
		});

		queryClient.setQueryData(['get-event', eventId], (oldData: Event) => {
			const data = {
				...oldData,
				...response,
			};

			return data;
		});

		setEventIdToEdit(undefined);

		toast.success('Event has been updated.');
	};

	return (
		<div className='flex items-center justify-center fixed top-0 left-0 backdrop-blur-sm bg-muted/10 w-full h-full z-20'>
			<Card className='w-[500px]'>
				<CardHeader>
					<CardTitle>Edit Event</CardTitle>
					<CardDescription>Here you can edit the event.</CardDescription>
				</CardHeader>
				<CardContent>
					<form
						className='space-y-4'
						action={editEvent}
					>
						<FormField
							name='name'
							label='Enter name of event'
							description='Here you can enter name of event'
						>
							<Input
								type='text'
								id='name'
								name='name'
								placeholder='Chess Tournament'
								defaultValue={defaultValues.name}
							/>
						</FormField>

						<FormField
							name='image'
							label='Enter image url of event'
							description='Here you can enter image url of event'
						>
							<Input
								type='text'
								id='image'
								name='image'
								placeholder='https://via.placeholder.com/150'
								defaultValue={defaultValues.image}
							/>
						</FormField>

						<FormField
							name='description'
							label='Enter description of event'
							description='Here you can enter description of event'
						>
							<Textarea
								name='description'
								placeholder='Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nesciunt ex, totam provident officiis adipisci suscipit consectetur repellat officia magnam dolorum consequatur placeat enim deleniti cumque, soluta, praesentium dolorem vel!'
								className='resize-none'
								defaultValue={defaultValues.description}
							/>
						</FormField>

						<FormField
							name='location'
							label='Enter location of event'
							description='Here you can enter location of event'
						>
							<Input
								type='text'
								name='location'
								placeholder='Seattle, WA'
								defaultValue={defaultValues.location}
							/>
						</FormField>

						<FormField
							name='date'
							label='Enter date of event'
							description='Here you can enter date of event'
						>
							<Input
								type='date'
								name='date'
								placeholder='2022-01-01'
								defaultValue={formatDate(defaultValues.date, 'yyyy-MM-dd')}
							/>
						</FormField>

						<div className='flex justify-between'>
							<Button
								variant='outline'
								onClick={() => setEventIdToEdit(undefined)}
							>
								Cancel
							</Button>
							<Button type='submit'>Edit</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
