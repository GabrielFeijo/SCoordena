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

/**
 * @swagger
 * /api/metric/events-per-month:
 *   get:
 *     summary: Get event counts per month
 *     description: Retrieves the count of events for each month within a specified year.
 *     tags:
 *       - Metrics
 *     parameters:
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *         description: The year for which to retrieve event counts. Defaults to the current year if not provided.
 *     responses:
 *       200:
 *         description: An array of objects containing the count of events for each month.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   month:
 *                     type: string
 *                     description: The name of the month.
 *                   eventCount:
 *                     type: integer
 *                     description: The number of events in that month.
 *       401:
 *         description: Unauthorized. User session is not valid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unauthorized
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal Server Error
 */
