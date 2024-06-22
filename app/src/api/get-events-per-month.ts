import { api } from '@/lib/axios';

export type GetEventCountResponse = Array<{
	month: string;
	eventCount: number;
}>;

export async function getEventsPerMonth(year?: number) {
	const response = await api.get<GetEventCountResponse>(
		`/api/metric/events-per-month${year ? `?year=${year}` : ''}`
	);

	return response.data;
}
