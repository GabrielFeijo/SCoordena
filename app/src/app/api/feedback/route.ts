import { authOptions } from '@/lib/auth';
import { db } from '@/lib/prisma';

import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

import { z } from 'zod';

const createFeedback = async (req: NextRequest) => {
	try {
		const session = await getServerSession(authOptions);

		if (!session) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const schema = z.object({
			rating: z.number().min(1).max(5),
			comment: z.string().min(1),
			eventId: z.string().cuid(),
			userId: z.string().cuid(),
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

		const feedback = await db.feedback.create({
			data: response.data,
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
		});

		return NextResponse.json(feedback, { status: 201 });
	} catch (error) {
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 }
		);
	}
};

export { createFeedback as POST };

/**
 * @swagger
 * /api/feedback:
 *   post:
 *     summary: Create new feedback
 *     description: Creates a new feedback entry.
 *     tags:
 *       - Feedbacks
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FeedbackInput'
 *     responses:
 *       201:
 *         description: Feedback created successfully. Returns the created feedback object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Feedback'
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
