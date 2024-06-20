import { authOptions } from '@/lib/auth';
import { db } from '@/lib/prisma';

import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export const getEventByIdHandler = async (
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
				organizer: {
					select: {
						id: true,
						name: true,
						image: true,
					},
				},
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
				feedbacks: {
					select: {
						id: true,
						rating: true,
						comment: true,
						user: {
							select: {
								id: true,
								name: true,
								image: true,
							},
						},
					},
				},
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

export { getEventByIdHandler as GET };
