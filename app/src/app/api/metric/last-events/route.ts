import { authOptions } from '@/lib/auth';
import { db } from '@/lib/prisma';

import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

const getUpcomingEvents = async () => {
	try {
		const session = await getServerSession(authOptions);

		if (!session) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const data = await db.event.findMany({
			select: {
				id: true,
				name: true,
				date: true,
			},
			where: {
				date: {
					lte: new Date(),
				},
			},
		});

		return NextResponse.json(data, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 }
		);
	}
};

export { getUpcomingEvents as GET };

/**
 * @swagger
 * /api/metric/last-events:
 *   get:
 *     summary: Retrieve upcoming events
 *     description: Retrieves a list of upcoming events from the database.
 *     tags:
 *       - Metrics
 *     responses:
 *       200:
 *         description: A list of upcoming events.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The ID of the event.
 *                   name:
 *                     type: string
 *                     description: The name of the event.
 *                   date:
 *                     type: string
 *                     format: date-time
 *                     description: The date of the event.
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
