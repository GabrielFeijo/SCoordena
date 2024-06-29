import { db } from '../../utils/prisma';
import { CreateFeedbackInput } from './feedback.schema';

export async function createFeedback(input: CreateFeedbackInput) {
	const feedback = await db.feedback.create({
		data: input,
		select: {
			id: true,
			rating: true,
			comment: true,
			createdAt: true,
			updatedAt: true,
			user: {
				select: {
					id: true,
					name: true,
				},
			},
		},
	});

	return feedback;
}
