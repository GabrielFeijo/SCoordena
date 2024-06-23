/**
 * @swagger
 * tags:
 *   - name: Schedule
 *     description: API for managing schedule items
 *   - name: Events
 *     description: Operations related to events
 *   - name: Metrics
 *     description: Operations related to metrics
 *   - name: Feedbacks
 *     description: Operations related to feedbacks
 *   - name: Registration
 *     description: Operations related to user registration for events
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     EventInput:
 *       type: object
 *       required:
 *         - name
 *         - date
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the event.
 *         date:
 *           type: string
 *           format: date-time
 *           description: Date of the event (YYYY-MM-DD).
 *         description:
 *           type: string
 *           description: Description of the event.
 *         image:
 *           type: string
 *           description: Image URL of the event.
 *         location:
 *           type: string
 *           description: Location of the event.
 *         organizerId:
 *           type: string
 *           format: cuid
 *           description: ID of the organizer.
 *     Event:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the event.
 *         name:
 *           type: string
 *           description: Name of the event.
 *         date:
 *           type: string
 *           format: date
 *           description: Date of the event (YYYY-MM-DD).
 *         description:
 *           type: string
 *           description: Description of the event.
 *         registrations:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Registration'
 *           description: List of registrations for the event.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date and time when the event was created.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date and time when the event was last updated.
 *         organizer:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               description: Organizer's ID.
 *             name:
 *               type: string
 *               description: Organizer's name.
 *             image:
 *               type: string
 *               description: Organizer's image URL.
 *           description: Organizer of the event.
 *         schedule:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ScheduleItem'
 *           description: List of schedule items for the event.
 *         feedbacks:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Feedback'
 *           description: List of feedbacks for the event.
 *     Registration:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the registration.
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               description: User's ID.
 *             name:
 *               type: string
 *               description: User's name.
 *             image:
 *               type: string
 *               description: User's image URL.
 *           description: User who registered for the event.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date and time when the registration was created.
 *     ScheduleItem:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the schedule item.
 *         title:
 *           type: string
 *           description: Title of the schedule item.
 *         description:
 *           type: string
 *           description: Description of the schedule item.
 *         startTime:
 *           type: string
 *           format: string
 *           description: Start time of the schedule item.
 *         endTime:
 *           type: string
 *           format: string
 *           description: End time of the schedule item.
 *     Feedback:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the feedback.
 *         rating:
 *           type: number
 *           description: Rating given in the feedback.
 *         comment:
 *           type: string
 *           description: Comment provided in the feedback.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date and time when the feedback was created.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date and time when the feedback was last updated.
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               description: User's ID who gave the feedback.
 *             name:
 *               type: string
 *               description: User's name who gave the feedback.
 *             image:
 *               type: string
 *               description: User's image URL who gave the feedback.
 *           description: User who gave the feedback.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     FeedbackInput:
 *       type: object
 *       properties:
 *         rating:
 *           type: number
 *           description: The rating given in the feedback (1-5).
 *           example: 5
 *         comment:
 *           type: string
 *           description: The comment given in the feedback.
 *           example: Great event!
 *         eventId:
 *           type: string
 *           format: cuid
 *           description: The ID of the event.
 *         userId:
 *           type: string
 *           format: cuid
 *           description: The ID of the user giving the feedback.
 *           example: abc123
 *       required:
 *         - rating
 *         - userId
 *         - eventId
 *
 *     Feedback:
 *       allOf:
 *         - type: object
 *           properties:
 *             id:
 *               type: string
 *               description: The ID of the feedback.
 *               example: abc123
 *             rating:
 *               type: number
 *               description: The rating given in the feedback (1-5).
 *               example: 5
 *             comment:
 *               type: string
 *               description: The comment given in the feedback.
 *               example: Great event!
 *             createdAt:
 *               type: string
 *               format: date-time
 *               description: The creation date of the feedback.
 *               example: '2024-06-25T12:00:00Z'
 *             updatedAt:
 *               type: string
 *               format: date-time
 *               description: The last update date of the feedback.
 *               example: '2024-06-25T12:30:00Z'
 *             user:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The ID of the user who gave the feedback.
 *                   example: def456
 *                 name:
 *                   type: string
 *                   description: The name of the user who gave the feedback.
 *                   example: John Doe
 *                 image:
 *                   type: string
 *                   description: The image URL of the user who gave the feedback.
 *                   example: https://example.com/avatar.jpg
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Schedule:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: cuid
 *           description: The unique identifier of the schedule item.
 *         title:
 *           type: string
 *           description: The title of the schedule item.
 *         description:
 *           type: string
 *           description: The description of the schedule item.
 *         startTime:
 *           type: string
 *           format: string
 *           description: The start time of the schedule item.
 *         endTime:
 *           type: string
 *           format: string
 *           description: The end time of the schedule item.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The creation timestamp of the schedule item.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The last update timestamp of the schedule item.
 *     ScheduleInput:
 *       type: object
 *       properties:
 *         eventId:
 *           type: string
 *           description: The ID of the event.
 *           format: cuid
 *         title:
 *           type: string
 *           description: The title of the schedule item.
 *         description:
 *           type: string
 *           description: The description of the schedule item.
 *         startTime:
 *           type: string
 *           format: string
 *           description: The start time of the schedule item.
 *         endTime:
 *           type: string
 *           format: string
 *           description: The end time of the schedule item.
 *       required:
 *         - eventId
 *         - title
 *         - startTime
 *         - endTime
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CalendarEvent:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: cuid
 *           description: The unique identifier of the event.
 *         name:
 *           type: string
 *           description: The name of the event.
 *         date:
 *           type: string
 *           format: date-time
 *           description: The date of the event.
 */
