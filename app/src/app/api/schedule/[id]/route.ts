import { authOptions } from '@/lib/auth';
import { db } from '@/lib/prisma';
import { Schedule } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

const updateScheduleItemById = async (
	req: NextRequest,
	{ params }: { params: { id: string } }
) => {
	try {
		const session = await getServerSession(authOptions);

		if (!session) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const id = params.id;

		const data: Schedule = await req.json();

		const scheduleItem = await db.schedule.update({
			select: {
				id: true,
				title: true,
				description: true,
				startTime: true,
				endTime: true,
			},
			where: {
				id,
			},
			data,
		});

		return NextResponse.json(scheduleItem, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 }
		);
	}
};

const deleteScheduleItemById = async (
	req: NextRequest,
	{ params }: { params: { id: string } }
) => {
	try {
		const session = await getServerSession(authOptions);

		if (!session) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const id = params.id;

		const scheduleItem = await db.schedule.delete({
			where: {
				id,
			},
		});

		return NextResponse.json(scheduleItem, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 }
		);
	}
};

export { updateScheduleItemById as PATCH, deleteScheduleItemById as DELETE };
