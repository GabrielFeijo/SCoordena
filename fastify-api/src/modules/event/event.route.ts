import { FastifyInstance } from 'fastify';
import { $ref } from './event.schema';
import {
	deleteEventByIdHandler,
	getCalendarEventsHandler,
	getEventByIdHandler,
	getEventScheduleHandler,
	getEventsHandler,
	getUserEventsHandler,
	registerEventHandler,
	updateEventByIdHandler,
} from './event.controller';

async function eventRoutes(server: FastifyInstance) {
	server.get(
		'/',
		{
			schema: {
				response: {
					200: $ref('getEventsResponseSchema'),
				},
			},
		},
		getEventsHandler
	);

	server.get(
		'/calendar',
		{
			schema: {
				response: {
					200: $ref('getCalendarEventsResponseSchema'),
				},
			},
		},
		getCalendarEventsHandler
	);

	server.get(
		'/schedule/:id',
		{
			schema: {
				response: {
					200: $ref('getEventScheduleResponseSchema'),
				},
			},
		},
		getEventScheduleHandler
	);

	server.get(
		'/user/:id',
		{
			schema: {
				response: {
					200: $ref('getUserEventsResponseSchema'),
				},
			},
		},
		getUserEventsHandler
	);

	server.post(
		'/',
		{
			schema: {
				body: $ref('createEventSchema'),
				response: {
					201: $ref('createEventResponseSchema'),
				},
			},
		},
		registerEventHandler
	);

	server.get(
		'/:id',
		{
			schema: {
				response: {
					200: $ref('getEventResponseSchema'),
				},
			},
		},
		getEventByIdHandler
	);

	server.patch(
		'/:id',
		{
			schema: {
				body: $ref('createEventSchema'),
				response: {
					200: $ref('getEventResponseSchema'),
				},
			},
		},
		updateEventByIdHandler
	);

	server.delete(
		'/:id',
		{
			schema: {
				response: {
					204: {},
				},
			},
		},
		deleteEventByIdHandler
	);
}

export default eventRoutes;
