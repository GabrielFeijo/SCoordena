import { authOptions } from '@/lib/auth';
import { db } from '@/lib/prisma';

import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

const registerUserToEvent = async (req: NextRequest) => {
	try {
		const session = await getServerSession(authOptions);

		if (!session) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const data: { eventId: string; userId: string } = await req.json();

		const registration = await db.registration.create({
			data,
			select: {
				user: {
					select: {
						id: true,
						name: true,
						image: true,
					},
				},
				createdAt: true,
				updatedAt: true,
			},
		});

		return NextResponse.json(registration, { status: 201 });
	} catch (error) {
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 }
		);
	}
};

export { registerUserToEvent as POST };
