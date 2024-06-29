import { db } from '../../utils/prisma';
import { CreateScheduleItemInput } from './schedule.schema';

export async function createScheduleItem(input: CreateScheduleItemInput) {
	const scheduleItem = await db.schedule.create({
		data: input,
	});

	return scheduleItem;
}
