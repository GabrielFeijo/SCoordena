import { FastifyInstance } from 'fastify';
import { registerUserToEventHandler } from './registration.controller';
import { $ref } from './registration.schema';

async function registrationRoutes(server: FastifyInstance) {
	server.post(
		'/',
		{
			schema: {
				body: $ref('createRegistrationSchema'),
				response: {
					201: $ref('createRegistrationResponseSchema'),
				},
			},
		},
		registerUserToEventHandler
	);
}

export default registrationRoutes;
