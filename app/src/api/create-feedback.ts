import { api } from '@/lib/axios';

export type Feedback = {
	userId: string;
	eventId: string;
	rating: number;
	comment: string;
};

export async function createFeedbackHandler(data: Feedback) {
	const response = await api.post('/api/feedback', data);

	return response.data;
}
