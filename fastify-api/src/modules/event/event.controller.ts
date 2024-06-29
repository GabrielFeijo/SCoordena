import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateEventInput } from './event.schema';
import {
	createEvent,
	deleteEventById,
	getCalendarEvents,
	getEventById,
	getEventSchedule,
	getEvents,
	getUserEvents,
	updateEventById,
} from './event.service';

export async function registerEventHandler(
	request: FastifyRequest<{
		Body: CreateEventInput;
	}>,
	reply: FastifyReply
) {
	const body = request.body;

	try {
		const event = await createEvent(body);
		return reply.status(201).send(event);
	} catch (error) {
		console.error(error);
		reply.status(500).send({
			message: 'Internal Server Error',
			error: error,
		});
	}
}

export async function getEventsHandler() {
	return await getEvents();
}

export async function getCalendarEventsHandler() {
	return await getCalendarEvents();
}

export async function getUserEventsHandler(
	request: FastifyRequest<{
		Params: {
			id: string;
		};
	}>
) {
	return await getUserEvents(request.params.id);
}

export async function getEventScheduleHandler(
	request: FastifyRequest<{
		Params: {
			id: string;
		};
	}>
) {
	return await getEventSchedule(request.params.id);
}

export async function getEventByIdHandler(
	request: FastifyRequest<{
		Params: {
			id: string;
		};
	}>,
	reply: FastifyReply
) {
	try {
		const event = await getEventById(request.params.id);
		return reply.status(200).send(event);
	} catch (error) {
		console.error(error);
		reply.status(500).send({
			message: 'Internal Server Error',
			error: error,
		});
	}
}

export async function updateEventByIdHandler(
	request: FastifyRequest<{
		Params: {
			id: string;
		};
		Body: CreateEventInput;
	}>,
	reply: FastifyReply
) {
	try {
		const event = await updateEventById(request.params.id, request.body);
		return reply.status(200).send(event);
	} catch (error) {
		console.error(error);
		reply.status(500).send({
			message: 'Internal Server Error',
			error: error,
		});
	}
}

export async function deleteEventByIdHandler(
	request: FastifyRequest<{
		Params: {
			id: string;
		};
	}>,
	reply: FastifyReply
) {
	try {
		await deleteEventById(request.params.id);
		return reply.status(204).send();
	} catch (error) {
		console.error(error);
		reply.status(500).send({
			message: 'Internal Server Error',
			error: error,
		});
	}
}
