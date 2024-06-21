import { authOptions } from '@/lib/auth';
import { db } from '@/lib/prisma';
import { Event } from '@prisma/client';

import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export const createEventHandler = async (req: NextRequest) => {
	try {
		const session = await getServerSession(authOptions);

		if (!session) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const data: Event = await req.json();

		const event = await db.event.create({ data });

		return NextResponse.json(event, { status: 201 });
	} catch (error) {
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 }
		);
	}
};
