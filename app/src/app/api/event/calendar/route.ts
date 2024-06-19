import { authOptions } from '@/lib/auth';
import { db } from '@/lib/prisma';

import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export const fetchCalendarEvents = async () => {
	try {
		const session = await getServerSession(authOptions);

		if (!session) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const events = await db.event.findMany({
			select: {
				id: true,
				name: true,
				date: true,
			},
			orderBy: {
				date: 'asc',
			},
		});

		return NextResponse.json(events, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 }
		);
	}
};

export { fetchCalendarEvents as GET };
