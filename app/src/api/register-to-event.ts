import { api } from '@/lib/axios';

export type RegisterToEvent = {
	userId: string;
	eventId: string;
};

export async function registerToEventHandler(data: RegisterToEvent) {
	const response = await api.post('/api/registration', data);

	return response.data;
}
