import { authOptions } from '@/lib/auth';
import { db } from '@/lib/prisma';
import { startOfMonth, subMonths } from 'date-fns';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

const getTotalEvents = async () => {
	try {
		const session = await getServerSession(authOptions);

		if (!session) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

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

		return NextResponse.json(
			{
				total: totalEvents,
				difference: difference,
			},
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 }
		);
	}
};

export { getTotalEvents as GET };

/**
 * @swagger
 * /api/metric/total-events:
 *   get:
 *     summary: Get total events and difference from previous month
 *     description: Retrieves the total number of events and the difference in event counts between the current and previous month.
 *     tags:
 *       - Metrics
 *     responses:
 *       200:
 *         description: Object containing total events and difference from previous month.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   description: Total number of events.
 *                 difference:
 *                   type: integer
 *                   description: Difference in event counts between the current and previous month.
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
