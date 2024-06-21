import { api } from '@/lib/axios';
import { GetEventsResponse } from './get-events';

export async function getUserEvents({ userId }: { userId: string }) {
	const response = await api.get<GetEventsResponse>(
		`/api/event/user/${userId}`
	);

	return response.data;
}
