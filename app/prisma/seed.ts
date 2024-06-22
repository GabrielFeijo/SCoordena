const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');
const cuid = require('cuid');

const prisma = new PrismaClient();

async function main() {
	// Seed Users
	const users = [];
	for (let i = 0; i < 5; i++) {
		users.push({
			id: cuid(),
			name: faker.name.fullName(),
			email: faker.internet.email(),
			emailVerified: faker.date.past(),
			image: faker.image.avatarLegacy(),
		});
	}
	await prisma.user.createMany({
		data: users,
	});

	// Seed Events
	const events = [];
	for (let i = 0; i < 5; i++) {
		events.push({
			id: cuid(),
			name: faker.lorem.words(3),
			description: faker.lorem.sentence(),
			image: faker.image.url(),
			date: faker.date.future(),
			location: faker.address.city(),
			organizerId: users[i % users.length].id, // Assigning organizerId from created users
		});
	}
	await prisma.event.createMany({
		data: events,
	});

	// Seed Schedules
	const schedules = [];
	for (let i = 0; i < 5; i++) {
		schedules.push({
			eventId: events[i % events.length].id,
			title: faker.lorem.words(2),
			description: faker.lorem.sentence(),
			startTime: faker.date.future(),
			endTime: faker.date.future(),
		});
	}
	await prisma.schedule.createMany({
		data: schedules,
	});

	// Seed Registrations
	const registrations = [];
	for (let i = 0; i < 5; i++) {
		registrations.push({
			eventId: events[i % events.length].id,
			userId: users[i % users.length].id,
		});
	}
	await prisma.registration.createMany({
		data: registrations,
	});

	// Seed Feedbacks
	const feedbacks = [];
	for (let i = 0; i < 5; i++) {
		feedbacks.push({
			eventId: events[i % events.length].id,
			userId: users[i % users.length].id,
			rating: faker.datatype.number({ min: 1, max: 5 }),
			comment: faker.lorem.sentence(),
		});
	}
	await prisma.feedback.createMany({
		data: feedbacks,
	});
}

main()
	.then(() => {
		console.log('Seed do banco de dados realizado com sucesso!');
	})
	.catch((error) => {
		console.error(error);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
