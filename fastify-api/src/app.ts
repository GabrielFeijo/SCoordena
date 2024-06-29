import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import fjwt, { FastifyJWT } from '@fastify/jwt';
import fCookie from '@fastify/cookie';
import { userSchemas } from './modules/user/user.schema';
import userRoutes from './modules/user/user.route';
import metricRoutes from './modules/metric/metric.route';
import { metricSchemas } from './modules/metric/metric.schema';
import { feedbackSchemas } from './modules/feedback/feedback.schema';
import feedbackRoutes from './modules/feedback/feedback.route';
import { registrationSchemas } from './modules/registration/registration.schema';
import registrationRoutes from './modules/registration/registration.route';
import { scheduleSchemas } from './modules/schedule/schedule.schema';
import scheduleRoutes from './modules/schedule/schedule.route';

const server = Fastify();

server.register(fjwt, {
	secret: process.env.JWT_SECRET || 'some-secret-key',
});

server.addHook('preHandler', (req: FastifyRequest, res: FastifyReply, next) => {
	req.jwt = server.jwt;
	return next();
});

server.register(fCookie, {
	secret: process.env.COOKIE_SECRET || 'some-secret-key',
	hook: 'preHandler',
});

server.get('/helloworld', async (req, res) => {
	return { message: 'Hello World!' };
});

async function main() {
	for (const schema of [
		...userSchemas,
		...metricSchemas,
		...feedbackSchemas,
		...registrationSchemas,
		...scheduleSchemas,
	]) {
		server.addSchema(schema);
	}

	server.register(userRoutes, { prefix: 'api/users' });
	server.register(metricRoutes, { prefix: 'api/metric' });
	server.register(feedbackRoutes, { prefix: 'api/feedback' });
	server.register(registrationRoutes, { prefix: 'api/registration' });
	server.register(scheduleRoutes, { prefix: 'api/schedule' });

	try {
		await server.listen({ port: 3333, host: '0.0.0.0' });
		console.log('Server listening at http://localhost:3333');
	} catch (error) {
		console.error(error);
		process.exit(1); // exit as failure
	}
}

main();
