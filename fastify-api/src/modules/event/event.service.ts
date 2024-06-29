import { db } from '../../utils/prisma';
import { CreateEventInput } from './event.schema';

export async function createEvent(input: CreateEventInput) {
	const feedback = await db.event.create({
		data: { ...input, date: new Date(input.date) },
	});

	return feedback;
}

export async function getEvents() {
	const events = await db.event.findMany({
		include: {
			registrations: {
				include: {
					user: {
						select: {
							id: true,
							name: true,
						},
					},
				},
			},
		},
		orderBy: {
			date: 'asc',
		},
	});

	return events;
}

export async function getUserEvents(id: string) {
	const data = await db.registration.findMany({
		where: {
			userId: id,
		},
		include: {
			event: {
				include: {
					registrations: {
						include: {
							user: {
								select: {
									id: true,
									name: true,
								},
							},
						},
						orderBy: {
							createdAt: 'desc',
						},
					},
				},
			},
		},
	});

	return data;
}

export async function getEventById(id: string) {
	const event = await db.event.findUnique({
		include: {
			organizer: {
				select: {
					id: true,
					name: true,
				},
			},
			registrations: {
				include: {
					user: {
						select: {
							id: true,
							name: true,
						},
					},
				},
				orderBy: {
					createdAt: 'desc',
				},
			},
			feedbacks: {
				select: {
					id: true,
					rating: true,
					comment: true,
					createdAt: true,
					updatedAt: true,
					user: {
						select: {
							id: true,
							name: true,
						},
					},
				},
				orderBy: {
					createdAt: 'desc',
				},
			},
			schedule: {
				select: {
					id: true,
					title: true,
					description: true,
					startTime: true,
					endTime: true,
				},
			},
		},
		where: {
			id,
		},
	});

	return event;
}

export async function getEventSchedule(id: string) {
	const event = await db.event.findUnique({
		include: {
			schedule: {
				select: {
					id: true,
					title: true,
					description: true,
					startTime: true,
					endTime: true,
				},
			},
		},
		where: {
			id,
		},
	});

	return event;
}

export async function getCalendarEvents() {
	const events = await db.event.findMany({
		select: {
			id: true,
			name: true,
			date: true,
		},
		orderBy: {
			date: 'asc',
		},
	});

	return events;
}

export async function updateEventById(id: string, data: CreateEventInput) {
	const event = await db.event.update({
		where: { id },
		data,
	});

	return event;
}

export async function deleteEventById(id: string) {
	await db.event.delete({
		where: { id },
	});
}
