import { authOptions } from '@/lib/auth';
import { db } from '@/lib/prisma';

import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export const createEventHandler = async (req: NextRequest) => {
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

	const event = await db.event.create({
		data: {
			name: 'Event Name',
			description: 'Event Description',
			date: new Date('2022-06-01 03:00:00'),
			location: 'Event Location',
			organizerId: session?.user.id as string,
		},
	});

	return NextResponse.json(
		{
			event,
		},
		{
			status: 201,
		}
	);
};
