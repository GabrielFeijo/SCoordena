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

/**
 * @swagger
 * /api/event/schedule/{id}:
 *   get:
 *     summary: Get event schedule
 *     description: Returns the schedule of a specific event by its ID.
 *     tags:
 *       - Events
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the event
 *     responses:
 *       200:
 *         description: Event schedule retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID of the event
 *                 schedule:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ScheduleItem'
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
