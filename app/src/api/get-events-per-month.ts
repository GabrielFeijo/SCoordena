import { api } from '@/lib/axios';

export type GetEventsPerMonthResponse = Array<{
	month: string;
	eventCount: number;
}>;

export async function getEventsPerMonth(year?: number) {
	const response = await api.get<GetEventsPerMonthResponse>(
		`/api/metric/events-per-month${year ? `?year=${year}` : ''}`
	);

	return response.data;
}
