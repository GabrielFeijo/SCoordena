import { api } from '@/lib/axios';

export type Event = {
	image?: string;
	name: string;
	description?: string;
	date: Date;
	location: string;
	organizerId: string;
};

export async function createEventHandler(data: Event) {
	const response = await api.post('/api/event', data);

	return response.data;
}
