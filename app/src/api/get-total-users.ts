import { api } from '@/lib/axios';

export interface GetTotalUsersResponse {
	total: number;
	difference: number;
}

export async function getTotalUsers() {
	const response = await api.get<GetTotalUsersResponse>(
		'api/metric/total-users'
	);
	return response.data;
}
