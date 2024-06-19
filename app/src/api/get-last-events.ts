import { api } from '@/lib/axios';
import { Role } from '@prisma/client';

export type GetEventsResponse = Array<{
	id: string;
	image?: string;
	name: string;
	description?: string;
	date: Date;
	location: string;
	organizerId: string;
	organizer: Organizer;
	createdAt: Date;
	updatedAt: Date;
}>;

type Organizer = {
	id: string;
	name: string | null;
	email: string | null;
	emailVerified: Date | null;
	image: string | null;
	role: Role;
	createdAt: Date;
	updatedAt: Date;
};

export async function getLastEvents() {
	const response = await api.get<GetEventsResponse>('/api/metric/last-events');

	return response.data;
}
