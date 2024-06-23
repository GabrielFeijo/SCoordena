import { authOptions } from '@/lib/auth';
import { db } from '@/lib/prisma';
import { Schedule } from '@prisma/client';

import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

const createScheduleItem = async (req: NextRequest) => {
	try {
		const session = await getServerSession(authOptions);

		if (!session) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const data: Schedule = await req.json();

		const schedule = await db.schedule.create({ data });

		return NextResponse.json(schedule, { status: 201 });
	} catch (error) {
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 }
		);
	}
};

export { createScheduleItem as POST };
