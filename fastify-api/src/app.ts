import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import fjwt, { FastifyJWT } from '@fastify/jwt';
import fCookie from '@fastify/cookie';
import { userSchemas } from './modules/user/user.schema';
import userRoutes from './modules/user/user.route';

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
	for (const schema of userSchemas) {
		server.addSchema(schema);
	}

	server.register(userRoutes, { prefix: 'api/users' });

	try {
		await server.listen({ port: 3333, host: '0.0.0.0' });
		console.log('Server listening at http://localhost:3333');
	} catch (error) {
		console.error(error);
		process.exit(1); // exit as failure
	}
}

main();
