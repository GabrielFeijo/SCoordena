import { authOptions } from '@/lib/auth';
import { db } from '@/lib/prisma';
import { startOfMonth, subMonths } from 'date-fns';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export const getTotalFeedbacks = async () => {
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
