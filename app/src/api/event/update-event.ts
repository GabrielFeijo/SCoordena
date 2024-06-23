import { api } from '@/lib/axios';

export type Event = {
	image?: string;
	name: string;
	description?: string;
	date: Date;
	location: string;
};

export async function updateEvent(id: string, data: Event) {
	const response = await api.patch(`/api/event/${id}`, data);

	return response.data;
}
