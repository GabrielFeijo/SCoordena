import { authOptions } from '@/lib/auth';
import { db } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

const getEventSchedule = async (
	req: NextRequest,
	{ params }: { params: { id: string } }
) => {
	try {
		const session = await getServerSession(authOptions);

		if (!session) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const id = params.id;

		const event = await db.event.findUnique({
			include: {
				schedule: {
					select: {
						id: true,
						title: true,
						description: true,
						startTime: true,
						endTime: true,
					},
				},
			},
			where: {
				id,
			},
		});

		return NextResponse.json(event, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 }
		);
	}
};

export { getEventSchedule as GET };
