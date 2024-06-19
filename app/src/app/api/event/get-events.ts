import { authOptions } from '@/lib/auth';
import { db } from '@/lib/prisma';

import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export const getEventsHandler = async () => {
	const session = await getServerSession(authOptions);

	if (!session) {
		return NextResponse.json(
			{
				error: 'Unauthorized',
			},
			{
				status: 401,
			}
		);
	}

	const data = await db.event.findMany({
		include: {
			organizer: true,
		},
	});

	return NextResponse.json(data, {
		status: 200,
	});
};
