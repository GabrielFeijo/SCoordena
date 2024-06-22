import { authOptions } from '@/lib/auth';
import { db } from '@/lib/prisma';
import { Event } from '@prisma/client';

import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

const getEventById = async (
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
					orderBy: {
						createdAt: 'desc',
					},
				},
				feedbacks: {
					select: {
						id: true,
						rating: true,
						comment: true,
						createdAt: true,
						updatedAt: true,
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

const updateEventById = async (
	req: NextRequest,
	{ params }: { params: { id: string } }
) => {
	try {
		const session = await getServerSession(authOptions);

		if (!session) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const id = params.id;

		const data: Event = await req.json();

		const event = await db.event.update({
			where: {
				id,
			},
			data,
		});

		return NextResponse.json(event, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 }
		);
	}
};

const deleteEventById = async (
	req: NextRequest,
	{ params }: { params: { id: string } }
) => {
	try {
		const session = await getServerSession(authOptions);

		if (!session) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const id = params.id;

		const event = await db.event.delete({
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

export {
	getEventById as GET,
	updateEventById as PATCH,
	deleteEventById as DELETE,
};

/**
 * @swagger
 * /api/events/{id}:
 *   get:
 *     summary: Get event by ID
 *     description: Retrieve detailed information about an event by its ID.
 *     tags:
 *       - Events
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the event to retrieve.
 *     responses:
 *       200:
 *         description: Event retrieved successfully. Returns the event object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
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

/**
 * @swagger
 * /api/events/{id}:
 *   patch:
 *     summary: Update event by ID
 *     description: Update details of an event by its ID.
 *     tags:
 *       - Events
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the event to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       200:
 *         description: Event updated successfully. Returns the updated event object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
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

/**
 * @swagger
 * /api/events/{id}:
 *   delete:
 *     summary: Delete event by ID
 *     description: Delete an event by its ID.
 *     tags:
 *       - Events
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the event to delete.
 *     responses:
 *       200:
 *         description: Event deleted successfully. Returns the deleted event object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
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
