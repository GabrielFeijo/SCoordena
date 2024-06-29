import { db } from '../../utils/prisma';

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
