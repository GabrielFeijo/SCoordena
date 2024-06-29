import { FastifyInstance } from 'fastify';
import { $ref } from './schedule.schema';
import { registerScheduleItemHandler } from './schedule.controller';

async function scheduleRoutes(server: FastifyInstance) {
	server.post(
		'/',
		{
			preHandler: [server.authenticate],
			schema: {
				body: $ref('createScheduleItemSchema'),
				response: {
					201: $ref('createScheduleItemResponseSchema'),
				},
			},
		},
		registerScheduleItemHandler
	);
}

export default scheduleRoutes;
