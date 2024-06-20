import { api } from '@/lib/axios';

export interface GetTotalEventsResponse {
	total: number;
	difference: number;
}

export async function getTotalEvents() {
	const response = await api.get<GetTotalEventsResponse>(
		'api/metric/total-events'
	);
	return response.data;
}
