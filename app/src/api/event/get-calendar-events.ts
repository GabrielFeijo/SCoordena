import { api } from '@/lib/axios';
import { Role } from '@prisma/client';

export type Event = {
	id: string;
	name: string;
	date: Date;
};

export type GetCalendarEventsResponse = Array<Event>;

export async function getCalendarEvents() {
	const response = await api.get<GetCalendarEventsResponse>(
		'/api/event/calendar'
	);

	return response.data;
}
