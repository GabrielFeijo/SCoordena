import { api } from '@/lib/axios';

export type GetEventScheduleResponse = Event;

export type Event = {
	id: string;
	image?: string;
	name: string;
	description?: string;
	date: Date;
	location: string;
	organizerId: string;
	schedule: Schedule[];
	createdAt: Date;
	updatedAt: Date;
};

export type Schedule = {
	id: string;
	title: string;
	description: string | null;
	startTime: string;
	endTime: string;
};

export async function getEventSchedule(id: string) {
	const response = await api.get<GetEventScheduleResponse>(
		`/api/event/schedule/${id}`
	);

	return response.data;
}
