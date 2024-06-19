import { api } from '@/lib/axios';

export type GetLastEventsResponse = Array<{
	id: string;
	name: string;
	date: Date;
}>;

export async function getLastEvents() {
	const response = await api.get<GetLastEventsResponse>(
		'/api/metric/last-events'
	);

	return response.data;
}
