import FormField from './form-field';
import { Star } from 'lucide-react';
import { Button } from '../ui/button';
import { useState } from 'react';
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import { createFeedbackHandler } from '@/api/create-feedback';
import { useQueryClient } from '@tanstack/react-query';
import { Event } from '@/api/get-event-by-id';

const FeedbackForm = ({ eventId }: { eventId: string }) => {
	const queryClient = useQueryClient();
	const { data: session } = useSession();

	const [rating, setRating] = useState(0);

	const handleSubmit = async (formData: FormData) => {
		const data = Object.fromEntries(formData);

		if (rating === 0 || data.comment === '') {
			return toast.error('Invalid fields');
		}

		const response = await createFeedbackHandler({
			eventId,
			rating,
			comment: data.comment as string,
			userId: session?.user?.id as string,
		});

		queryClient.setQueryData(['get-event'], (oldData: Event) => {
			const data = {
				...oldData,
				feedbacks: [response, ...oldData.feedbacks],
			};

			return data;
		});
	};

	return (
		<form
			className='p-4 rounded space-y-4 border'
			action={handleSubmit}
		>
			<h3 className='text-xl font-semibold'>Leave a Feedback</h3>

			<FormField
				name='rating'
				label='Rating'
				description='How would you rate this event?'
			>
				<div className='flex gap-1'>
					{Array(5)
						.fill(0)
						.map((_, index) => (
							<Button
								className='p-0 m-0 cursor-pointer hover:bg-transparent h-fit'
								variant='ghost'
								onClick={() => setRating(index + 1)}
								key={index}
								asChild
							>
								<Star
									className={`size-5 ${
										index < rating
											? 'fill-yellow-500 text-yellow-500'
											: 'fill-current'
									}`}
								/>
							</Button>
						))}
				</div>
			</FormField>
			<FormField
				name='comment'
				label='Comment'
				description='Tell us more about your experience.'
			>
				<Textarea
					id='comment'
					name='comment'
					rows={2}
					className='resize-none'
					placeholder='Write your comment here...'
				/>
			</FormField>
			<div className='flex justify-end'>
				<Button>Submit</Button>
			</div>
		</form>
	);
};

export default FeedbackForm;
