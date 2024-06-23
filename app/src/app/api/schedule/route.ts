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

/**
 * @swagger
 * /api/schedule:
 *   post:
 *     summary: Create a new schedule item
 *     description: Creates a new schedule item in the database.
 *     tags: [Schedule]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ScheduleInput'
 *     responses:
 *       201:
 *         description: Schedule item created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Schedule'
 *       401:
 *         description: Unauthorized. User session is not valid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unauthorized
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal Server Error
 */
