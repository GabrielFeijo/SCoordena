import { FastifyInstance } from 'fastify';
import {
	getEventsPerMonthHandler,
	getTotalEventsHandler,
	getTotalFeedbacksHandler,
	getTotalUsersHandler,
	getUpcomingEventsHandler,
} from './metric.controller';
import { $ref } from './metric.schema';

async function metricRoutes(server: FastifyInstance) {
	server.get(
		'/events-per-month',
		{
			schema: {
				querystring: $ref('getEventsPerMonthSchema'),
				response: {
					200: $ref('getEventsPerMonthResponseSchema'),
				},
			},
		},
		getEventsPerMonthHandler
	);

	server.get(
		'/last-events',
		{
			schema: {
				response: {
					200: $ref('getUpcomingEventsResponseSchema'),
				},
			},
		},
		getUpcomingEventsHandler
	);

	server.get(
		'/total-events',
		{
			schema: {
				response: {
					200: $ref('getTotalResponseSchema'),
				},
			},
		},
		getTotalEventsHandler
	);

	server.get(
		'/total-feedbacks',
		{
			schema: {
				response: {
					200: $ref('getTotalResponseSchema'),
				},
			},
		},
		getTotalFeedbacksHandler
	);

	server.get(
		'/total-users',
		{
			schema: {
				response: {
					200: $ref('getTotalResponseSchema'),
				},
			},
		},
		getTotalUsersHandler
	);
}

export default metricRoutes;
