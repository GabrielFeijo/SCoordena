import { buildJsonSchemas } from 'fastify-zod';
import * as z from 'zod';

const createRegistrationResponseSchema = z.object({
	id: z.string().cuid(),
	user: z.object({
		id: z.string().cuid(),
		name: z.string(),
	}),
	createdAt: z.date(),
	updatedAt: z.date(),
});

const createRegistrationSchema = z.object({
	userId: z.string().cuid(),
	eventId: z.string().cuid(),
});

export type CreateRegistrationInput = z.infer<typeof createRegistrationSchema>;

export const { schemas: registrationSchemas, $ref } = buildJsonSchemas(
	{
		createRegistrationResponseSchema,
		createRegistrationSchema,
	},
	{
		$id: 'registrationSchemas',
	}
);
