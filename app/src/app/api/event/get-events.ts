import { authOptions } from '@/lib/auth';
import { db } from '@/lib/prisma';

import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

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

	const events = await db.event.findMany({});

	return NextResponse.json(
		{
			events,
		},
		{
			status: 200,
		}
	);
};
