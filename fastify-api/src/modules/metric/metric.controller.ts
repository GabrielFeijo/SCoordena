import { FastifyRequest } from 'fastify';
import {
	getEventsPerMonth,
	getTotalEvents,
	getTotalFeedbacks,
	getTotalUsers,
	getUpcomingEvents,
} from './metric.service';

export async function getEventsPerMonthHandler(
	request: FastifyRequest<{
		Querystring: { year?: string };
	}>
) {
	return await getEventsPerMonth(request.query.year);
}

export async function getUpcomingEventsHandler() {
	return await getUpcomingEvents();
}

export async function getTotalEventsHandler() {
	return await getTotalEvents();
}

export async function getTotalFeedbacksHandler() {
	return await getTotalFeedbacks();
}

export async function getTotalUsersHandler() {
	return await getTotalUsers();
}
