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

/**
 * @swagger
 * /api/schedule/{id}:
 *   patch:
 *     summary: Update a schedule item
 *     description: Updates an existing schedule item by its ID.
 *     tags: [Schedule]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the schedule item to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ScheduleInput'
 *     responses:
 *       200:
 *         description: Schedule item updated successfully.
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
 *   delete:
 *     summary: Delete a schedule item
 *     description: Deletes a schedule item by its ID.
 *     tags: [Schedule]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the schedule item to delete
 *     responses:
 *       200:
 *         description: Schedule item deleted successfully.
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
