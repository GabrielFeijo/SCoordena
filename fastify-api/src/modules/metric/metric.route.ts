import { FastifyInstance } from 'fastify';
import { getEventsPerMonthHandler } from './metric.controller';
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
}

export default metricRoutes;
