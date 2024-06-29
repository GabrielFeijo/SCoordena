import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateScheduleItemInput } from './schedule.schema';
import { createScheduleItem } from './schedule.service';

export async function registerScheduleItemHandler(
	request: FastifyRequest<{
		Body: CreateScheduleItemInput;
	}>,
	reply: FastifyReply
) {
	const body = request.body;

	try {
		const scheduleItem = await createScheduleItem(body);
		return reply.status(201).send(scheduleItem);
	} catch (error) {
		console.error(error);
		reply.status(500).send({
			message: 'Internal Server Error',
			error: error,
		});
	}
}
