import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateFeedbackInput } from './feedback.schema';
import { createFeedback } from './feedback.service';

export async function registerFeedbackHandler(
	request: FastifyRequest<{
		Body: CreateFeedbackInput;
	}>,
	reply: FastifyReply
) {
	const body = request.body;

	try {
		const user = await createFeedback(body);
		return reply.status(201).send(user);
	} catch (error) {
		console.error(error);
		reply.status(500).send({
			message: 'Internal Server Error',
			error: error,
		});
	}
}
