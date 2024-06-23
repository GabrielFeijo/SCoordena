import { api } from '@/lib/axios';

export async function deleteScheduleItemById(id: string) {
	const response = await api.delete(`/api/schedule/${id}`);

	return response.data;
}
