import { api } from '@/lib/axios';

export type Schedule = {
	title: string;
	description: string;
	eventId: string;
	startTime: string;
	endTime: string;
};

export async function createScheduleItem(data: Schedule) {
	const response = await api.post('/api/schedule', data);

	return response.data;
}
