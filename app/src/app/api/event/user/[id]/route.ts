import { authOptions } from '@/lib/auth';
import { db } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

const getUserEvents = async (
	req: NextRequest,
	{ params }: { params: { id: string } }
) => {
	try {
		const session = await getServerSession(authOptions);

		if (!session) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const data = await db.registration.findMany({
			where: {
				userId: params.id,
			},
			include: {
				event: {
					include: {
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
					},
				},
			},
		});

		const events = data.map((registration) => registration.event);

		return NextResponse.json(events, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 }
		);
	}
};

export { getUserEvents as GET };

/**
 * @swagger
 * /api/event/user/{id}:
 *   get:
 *     summary: Get events for a user
 *     description: Returns a list of events that a user is registered for.
 *     tags:
 *       - Events
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: List of events for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
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
