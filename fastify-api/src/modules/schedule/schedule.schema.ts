import { buildJsonSchemas } from 'fastify-zod';
import * as z from 'zod';

const scheduleItem = {
	title: z.string().min(1),
	description: z.string().optional(),
	startTime: z.string().min(1),
	endTime: z.string().min(1),
	eventId: z.string().cuid(),
};

const createScheduleItemResponseSchema = z.object({
	id: z.string().cuid(),
	...scheduleItem,
});

const createScheduleItemSchema = z.object({
	...scheduleItem,
});

export type CreateScheduleItemInput = z.infer<typeof createScheduleItemSchema>;

export const { schemas: scheduleSchemas, $ref } = buildJsonSchemas(
	{
		createScheduleItemResponseSchema,
		createScheduleItemSchema,
	},
	{
		$id: 'scheduleSchemas',
	}
);
