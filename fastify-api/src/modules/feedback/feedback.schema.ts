import { buildJsonSchemas } from 'fastify-zod';
import * as z from 'zod';

const feedbackCore = {
	rating: z.number().min(1).max(5),
	comment: z.string().min(1),
};

const createFeedbackResponseSchema = z.object({
	id: z.string().cuid(),
	...feedbackCore,
	user: z.object({
		id: z.string().cuid(),
		name: z.string(),
	}),
});

const createFeedbackSchema = z.object({
	userId: z.string().cuid(),
	eventId: z.string().cuid(),
	...feedbackCore,
});

export type CreateFeedbackInput = z.infer<typeof createFeedbackSchema>;

export const { schemas: feedbackSchemas, $ref } = buildJsonSchemas(
	{
		createFeedbackResponseSchema,
		createFeedbackSchema,
	},
	{
		$id: 'feedbackSchemas',
	}
);
