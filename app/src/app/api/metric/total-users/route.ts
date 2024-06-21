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
