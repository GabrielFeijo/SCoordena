import { authOptions } from '@/lib/auth';
import { db } from '@/lib/prisma';
import { startOfMonth, subMonths } from 'date-fns';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

const getTotalUsers = async () => {
	try {
		const session = await getServerSession(authOptions);

		if (!session) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

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

		return NextResponse.json(
			{
				total: totalUsers,
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

export { getTotalUsers as GET };

/**
 * @swagger
 * /api/metric/total-users:
 *   get:
 *     summary: Get total users and difference from previous month
 *     description: Retrieves the total number of users and the difference in user counts between the current and previous month.
 *     tags:
 *       - Metrics
 *     responses:
 *       200:
 *         description: Object containing total users and difference from previous month.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   description: Total number of users.
 *                 difference:
 *                   type: integer
 *                   description: Difference in user counts between the current and previous month.
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
