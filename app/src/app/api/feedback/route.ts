import { authOptions } from '@/lib/auth';
import { db } from '@/lib/prisma';
import { Feedback } from '@prisma/client';

import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

const createFeedbackHandler = async (req: NextRequest) => {
	try {
		const session = await getServerSession(authOptions);

		if (!session) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const data: Feedback = await req.json();

		const feedback = await db.feedback.create({ data });

		return NextResponse.json(feedback, { status: 201 });
	} catch (error) {
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 }
		);
	}
};

export { createFeedbackHandler as POST };
