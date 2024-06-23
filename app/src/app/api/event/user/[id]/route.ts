import { createEventHandler } from '@/api/event/create-event';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

const getUserEvents = async (
	req: NextRequest,
	{ params }: { params: { id: string } }
) => {
	try {
		const session = await getServerSession(authOptions);

		if (!session) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const data = await db.registration.findMany({
			where: {
				userId: params.id,
			},
			include: {
				event: {
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
							orderBy: {
								createdAt: 'desc',
							},
						},
					},
				},
			},
		});

		const events = data.map((registration) => registration.event);

		return NextResponse.json(events, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 }
		);
	}
};

export { getUserEvents as GET };
