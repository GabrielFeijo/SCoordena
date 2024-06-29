import { FastifyReply, FastifyRequest } from 'fastify';
import { getEventsPerMonth } from './metric.service';

export async function getEventsPerMonthHandler(
	request: FastifyRequest<{
		Querystring: { year?: string };
	}>,
	reply: FastifyReply
) {
	const events = await getEventsPerMonth(request.query.year);

	return events;
}
