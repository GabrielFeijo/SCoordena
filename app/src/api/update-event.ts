import { api } from '@/lib/axios';

export type Event = {
	image?: string;
	name: string;
	description?: string;
	date: Date;
	location: string;
	organizerId: string;
};

export async function updateEventHandler(id: string, data: Event) {
	const response = await api.patch(`/api/event/${id}`, data);

	return response.data;
}
