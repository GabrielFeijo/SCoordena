import { api } from '@/lib/axios';

export type Event = {
	id: string;
	image?: string;
	name: string;
	description?: string;
	date: Date;
	location: string;
	organizerId: string;
	registrations?: Array<Registration>;
	createdAt: Date;
	updatedAt: Date;
};

export type GetEventsResponse = Array<Event>;

type Registration = {
	id: string;
	user: User;
	userId: string;
	createdAt: Date;
	updatedAt: Date;
};

type User = {
	id: string;
	name?: string;
	image?: string;
};

export async function getEvents() {
	const response = await api.get<GetEventsResponse>('/api/event');

	return response.data;
}
