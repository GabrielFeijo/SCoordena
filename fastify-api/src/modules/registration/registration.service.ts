import { db } from '../../utils/prisma';
import { CreateRegistrationInput } from './registration.schema';

export async function createRegistration(input: CreateRegistrationInput) {
	const registration = await db.registration.create({
		data: input,
		select: {
			id: true,
			user: {
				select: {
					id: true,
					name: true,
				},
			},
			createdAt: true,
			updatedAt: true,
		},
	});

	return registration;
}
