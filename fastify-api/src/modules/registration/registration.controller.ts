import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateRegistrationInput } from './registration.schema';
import { createRegistration } from './registration.service';

export async function registerUserToEventHandler(
	request: FastifyRequest<{
		Body: CreateRegistrationInput;
	}>,
	reply: FastifyReply
) {
	const body = request.body;

	try {
		const registration = await createRegistration(body);
		return reply.status(201).send(registration);
	} catch (error) {
		console.error(error);
		reply.status(500).send({
			message: 'Internal Server Error',
			error: error,
		});
	}
}
