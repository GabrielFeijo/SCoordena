import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { FastifyInstance } from 'fastify';

export function setupSwagger(server: FastifyInstance) {
	server.register(fastifySwagger, {
		swagger: {
			info: {
				title: 'API Documentation',
				description: 'API documentation with Swagger',
				version: '0.1.0',
			},
			host: 'localhost:3333',
			schemes: ['http'],
			consumes: ['application/json'],
			produces: ['application/json'],
		},
	});

	server.register(fastifySwaggerUi, {
		routePrefix: '/documentation',
		uiConfig: {
			deepLinking: false,
		},
		staticCSP: true,
		transformStaticCSP: (header) => header,
		transformSpecification: (swaggerObject, request, reply) => {
			return swaggerObject;
		},
		transformSpecificationClone: true,
	});
}
