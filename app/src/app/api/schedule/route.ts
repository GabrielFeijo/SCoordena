import { authOptions } from '@/lib/auth';
import { db } from '@/lib/prisma';
import { Schedule } from '@prisma/client';

import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

import { z } from 'zod';

const createScheduleItem = async (req: NextRequest) => {
	try {
		const session = await getServerSession(authOptions);

		if (!session) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const schema = z.object({
			title: z.string().min(1),
			description: z.string().optional(),
			startTime: z.string().min(1),
			endTime: z.string().min(1),
			eventId: z.string().cuid(),
		});

		const body = await req.json();

		const response = schema.safeParse(body);

		if (!response.success) {
			const { errors } = response.error;

			return NextResponse.json(
				{ error: { message: 'Invalid request', errors } },
				{ status: 400 }
			);
		}

		const schedule = await db.schedule.create({ data: response.data });

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
