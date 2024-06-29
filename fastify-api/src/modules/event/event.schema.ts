import { buildJsonSchemas } from 'fastify-zod';
import * as z from 'zod';

const eventCore = {
	name: z.string().min(1),
	description: z.string().optional(),
	image: z.string().optional(),
	location: z.string().min(1),
	organizerId: z.string().cuid(),
};

const createEventResponseSchema = z.object({
	id: z.string().cuid(),
	date: z.string(),
	...eventCore,
});

const getEventResponseSchema = z.object({
	id: z.string().cuid(),
	date: z.string(),
	...eventCore,
});

const getCalendarEventsResponseSchema = z.array(
	z.object({
		id: z.string().cuid(),
		name: z.string(),
		date: z.date(),
	})
);

const scheduleItem = {
	id: z.string().cuid(),
	title: z.string(),
	description: z.string(),
	startTime: z.string(),
	endTime: z.string(),
};

const getEventScheduleResponseSchema = z.object({
	id: z.string().cuid(),
	date: z.date(),
	...eventCore,
	schedule: z.array(z.object(scheduleItem)),
	createdAt: z.date(),
	updatedAt: z.date(),
});

const registration = {
	id: z.string().cuid(),
	eventId: z.string().cuid(),
	userId: z.string().cuid(),
	createdAt: z.date(),
	updatedAt: z.date(),
	user: z.object({ id: z.string().cuid(), name: z.string() }),
};

const getUserEventsResponseSchema = z.array(
	z.object({
		id: z.string().cuid(),
		eventId: z.string().cuid(),
		userId: z.string().cuid(),
		event: z.object({
			id: z.string().cuid(),
			date: z.date(),
			...eventCore,
			registrations: z.array(z.object(registration)),
			createdAt: z.date(),
			updatedAt: z.date(),
		}),
		createdAt: z.date(),
		updatedAt: z.date(),
	})
);

const getEventsResponseSchema = z.array(getEventResponseSchema);

const createEventSchema = z.object({
	date: z.string().transform((str) => new Date(str)),
	...eventCore,
});

export type CreateEventInput = z.infer<typeof createEventSchema>;

export const { schemas: eventSchemas, $ref } = buildJsonSchemas(
	{
		createEventResponseSchema,
		getEventsResponseSchema,
		getEventResponseSchema,
		getUserEventsResponseSchema,
		getCalendarEventsResponseSchema,
		getEventScheduleResponseSchema,
		createEventSchema,
	},
	{
		$id: 'eventSchemas',
	}
);
