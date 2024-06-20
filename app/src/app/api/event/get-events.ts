import { authOptions } from '@/lib/auth';
import { db } from '@/lib/prisma';

import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export const getEventsHandler = async () => {
	try {
		const session = await getServerSession(authOptions);

		if (!session) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}
		const data = await db.event.findMany({
			include: {
				registrations: {
					include: {
						user: {
							select: {
								id: true,
								name: true,
								image: true,
							},
						},
					},
				},
			},
			orderBy: {
				date: 'asc',
			},
		});

		return NextResponse.json(data, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 }
		);
	}
};
