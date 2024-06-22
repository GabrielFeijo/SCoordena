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

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register user for an event
 *     description: Registers a user for an event by creating a registration entry in the database.
 *     tags:
 *       - Registration
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               eventId:
 *                 type: string
 *                 description: ID of the event to register for.
 *               userId:
 *                 type: string
 *                 description: ID of the user registering for the event.
 *     responses:
 *       201:
 *         description: Registration successful. Returns the registration details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: ID of the registered user.
 *                     name:
 *                       type: string
 *                       description: Name of the registered user.
 *                     image:
 *                       type: string
 *                       description: URL of the registered user's image.
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Date and time when the registration was created.
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: Date and time when the registration was last updated.
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
