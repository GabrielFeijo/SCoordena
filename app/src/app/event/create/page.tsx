'use client';
import { createEventHandler } from '@/api/event/create-event';
import FormField from '@/components/event/form-field';
import Title from '@/components/title';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { z } from 'zod';

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

const Page = () => {
	const router = useRouter();
	const { data: userData } = useSession();

	const createEvent = async (formData: FormData) => {
		const data = Object.fromEntries(formData);

		const validatedFields = schema.safeParse(data);

		if (!validatedFields.success) {
			toast.error('Invalid fields');
			return {
				errors: validatedFields.error.flatten().fieldErrors,
			};
		}

		const event = await createEventHandler({
			...validatedFields.data,
			organizerId: userData?.user.id as string,
		});

		toast.success('Event has been created.');

		router.push(`/event/${event.id}`);
	};

	return (
		<form
			className='space-y-4'
			action={createEvent}
		>
			<Title>Create Event</Title>

			<div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
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
						rows={5}
						className='resize-none'
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
					/>
				</FormField>
			</div>

			<div className='flex justify-end w-full'>
				<Button
					type='submit'
					className='ml-auto'
				>
					Create Event
				</Button>
			</div>
		</form>
	);
};

export default Page;
