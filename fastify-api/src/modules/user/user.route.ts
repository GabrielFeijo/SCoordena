import { FastifyInstance } from 'fastify';

import {
	loginHandler,
	logoutHandler,
	registerUserHandler,
} from './user.controller';

import { $ref } from './user.schema';

async function userRoutes(server: FastifyInstance) {
	server.post(
		'/signup',
		{
			schema: {
				tags: ['Auth'],
				body: $ref('createUserSchema'),
				response: {
					201: $ref('createUserResponseSchema'),
				},
			},
		},
		registerUserHandler
	);

	server.post(
		'/login',
		{
			schema: {
				tags: ['Auth'],
				body: $ref('loginSchema'),
				response: {
					201: $ref('loginResponseSchema'),
				},
			},
		},
		loginHandler
	);

	server.delete(
		'/logout',
		{
			schema: {
				tags: ['Auth'],
			},
			preHandler: [server.authenticate],
		},
		logoutHandler
	);
}

export default userRoutes;
