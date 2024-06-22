import { authOptions } from '@/lib/auth';
import { db } from '@/lib/prisma';
import { startOfMonth, subMonths } from 'date-fns';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

const getTotalFeedbacks = async () => {
	try {
		const session = await getServerSession(authOptions);

		if (!session) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

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

		return NextResponse.json(
			{
				total: totalFeedbacks,
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

export { getTotalFeedbacks as GET };

/**
 * @swagger
 * /api/metric/total-feedbacks:
 *   get:
 *     summary: Get total feedbacks and difference from previous month
 *     description: Retrieves the total number of feedbacks and the difference in feedback counts between the current and previous month.
 *     tags:
 *       - Metrics
 *     responses:
 *       200:
 *         description: Object containing total feedbacks and difference from previous month.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   description: Total number of feedbacks.
 *                 difference:
 *                   type: integer
 *                   description: Difference in feedback counts between the current and previous month.
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
