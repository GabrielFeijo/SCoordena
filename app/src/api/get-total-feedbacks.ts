import { api } from '@/lib/axios';

export interface GetTotalFeedbacksResponse {
	total: number;
	difference: number;
}

export async function getTotalFeedbacks() {
	const response = await api.get<GetTotalFeedbacksResponse>(
		'api/metric/total-feedbacks'
	);
	return response.data;
}
