import { authOptions } from '@/lib/auth';
import { db } from '@/lib/prisma';

import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

const getEventsPerMonth = async (req: NextRequest) => {
	try {
		const session = await getServerSession(authOptions);

		if (!session) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const year =
			Number(req.nextUrl.searchParams.get('year')) || new Date().getFullYear();

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

		return NextResponse.json(result, { status: 200 });
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 }
		);
	}
};

export { getEventsPerMonth as GET };
