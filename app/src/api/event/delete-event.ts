import { api } from '@/lib/axios';

export async function deleteEventHandler(id: string) {
	const response = await api.delete(`/api/event/${id}`);

	return response.data;
}
