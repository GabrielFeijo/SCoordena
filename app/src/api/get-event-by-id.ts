import { api } from '@/lib/axios';
import { Role } from '@prisma/client';

export type GetEventByIdResponse = Event;

export type Event = {
	id: string;
	image?: string;
	name: string;
	description?: string;
	date: Date;
	location: string;
	organizerId: string;
	organizer: Organizer;
	registrations: Registration[];
	feedbacks: Feedback[];
	schedule: Schedule[];
	createdAt: Date;
	updatedAt: Date;
};

type Organizer = {
	id: string;
	name: string;
	image: string | null;
};

type User = {
	id: string;
	name: string;
	image: string | null;
};

export type Registration = {
	id: string;
	user: User;
	createdAt: Date;
	updatedAt: Date;
};

export type Feedback = {
	id: string;
	rating: number;
	comment: string | null;
	user: User;
	createdAt: Date;
	updatedAt: Date;
};

export type Schedule = {
	id: string;
	title: string;
	description: string | null;
	startTime: Date;
	endTime: Date;
};

export async function getEventById(id: string) {
	const response = await api.get<GetEventByIdResponse>(`/api/event/${id}`);

	return response.data;
}
