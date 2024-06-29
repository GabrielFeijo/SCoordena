import fastify, { FastifyInstance } from 'fastify';
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
			preHandler: [server.authenticate],
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
			preHandler: [server.authenticate],
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
			preHandler: [server.authenticate],
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
			preHandler: [server.authenticate],
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
			preHandler: [server.authenticate],
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
			preHandler: [server.authenticate],
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
			preHandler: [server.authenticate],
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
			preHandler: [server.authenticate],
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
