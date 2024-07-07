import { FastifyInstance } from 'fastify';
import { registerFeedbackHandler } from './feedback.controller';
import { $ref } from './feedback.schema';

async function feedbackRoutes(server: FastifyInstance) {
	server.post(
		'/',
		{
			preHandler: [server.authenticate],
			schema: {
				tags: ['Feedback'],
				body: $ref('createFeedbackSchema'),
				response: {
					201: $ref('createFeedbackResponseSchema'),
				},
			},
		},
		registerFeedbackHandler
	);
}

export default feedbackRoutes;
