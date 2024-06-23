import { api } from '@/lib/axios';

export type Schedule = {
	title: string;
	description: string | null;
	startTime: string;
	endTime: string;
};

export async function updateScheduleItemById(id: string, data: Schedule) {
	const response = await api.patch(`/api/schedule/${id}`, data);

	return response.data;
}
