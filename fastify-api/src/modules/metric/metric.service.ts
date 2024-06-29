import { db } from '../../utils/prisma';
import { startOfMonth, subMonths } from 'date-fns';

export async function getEventsPerMonth(defaultYear?: string) {
	const year = Number(defaultYear);

	const data = await db.event.findMany({
		where: {
			AND: [
				{ date: { gte: new Date(`${year}-01-01`) } },
				{ date: { lt: new Date(`${year + 1}-01-01`) } },
			],
		},
		select: {
			id: true,
			date: true,
		},
		orderBy: {
			date: 'asc',
		},
	});

	const eventCountsByMonth = data.reduce(
		(acc: { [key: string]: number }, event: { date: Date }) => {
			const month = new Date(event.date).toLocaleString('en-US', {
				month: 'long',
			});
			if (!acc[month]) {
				acc[month] = 0;
			}
			acc[month]++;
			return acc;
		},
		{} as { [key: string]: number }
	);

	const result = Object.keys(eventCountsByMonth).map((month) => ({
		month,
		eventCount: eventCountsByMonth[month],
	}));

	return result;
}

export async function getUpcomingEvents() {
	const data = await db.event.findMany({
		select: {
			id: true,
			name: true,
			date: true,
		},
		where: {
			date: {
				lte: new Date(),
			},
		},
	});

	return data;
}

export async function getTotalEvents() {
	const totalEvents = await db.event.count();

	const currentDate = new Date();
	const startOfCurrentMonth = startOfMonth(currentDate);
	const startOfPreviousMonth = startOfMonth(subMonths(currentDate, 1));

	const eventsInCurrentMonth = await db.event.count({
		where: {
			createdAt: {
				gte: startOfCurrentMonth,
			},
		},
	});

	const eventsInPreviousMonth = await db.event.count({
		where: {
			createdAt: {
				gte: startOfPreviousMonth,
				lt: startOfCurrentMonth,
			},
		},
	});

	const difference = eventsInCurrentMonth - eventsInPreviousMonth;

	return { total: totalEvents, difference };
}

export async function getTotalFeedbacks() {
	const totalFeedbacks = await db.feedback.count();

	const currentDate = new Date();
	const startOfCurrentMonth = startOfMonth(currentDate);
	const startOfPreviousMonth = startOfMonth(subMonths(currentDate, 1));

	const feedbacksInCurrentMonth = await db.feedback.count({
		where: {
			createdAt: {
				gte: startOfCurrentMonth,
			},
		},
	});

	const feedbacksInPreviousMonth = await db.feedback.count({
		where: {
			createdAt: {
				gte: startOfPreviousMonth,
				lt: startOfCurrentMonth,
			},
		},
	});

	const difference = feedbacksInCurrentMonth - feedbacksInPreviousMonth;

	return { total: totalFeedbacks, difference };
}

export async function getTotalUsers() {
	const totalUsers = await db.user.count();

	const currentDate = new Date();
	const startOfCurrentMonth = startOfMonth(currentDate);
	const startOfPreviousMonth = startOfMonth(subMonths(currentDate, 1));

	const usersInCurrentMonth = await db.user.count({
		where: {
			createdAt: {
				gte: startOfCurrentMonth,
			},
		},
	});

	const usersInPreviousMonth = await db.user.count({
		where: {
			createdAt: {
				gte: startOfPreviousMonth,
				lt: startOfCurrentMonth,
			},
		},
	});

	const difference = usersInCurrentMonth - usersInPreviousMonth;

	return { total: totalUsers, difference };
}
