import * as z from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const defaultYearQueryString = z
	.string()
	.optional()
	.default(new Date().getFullYear().toString());

const getEventsPerMonthSchema = z.object({
	year: defaultYearQueryString,
});

const getEventsPerMonthResponseSchema = z.array(
	z.object({
		month: z.string(),
		eventCount: z.number(),
	})
);

export const { schemas: metricSchemas, $ref } = buildJsonSchemas(
	{
		getEventsPerMonthResponseSchema,
		getEventsPerMonthSchema,
	},
	{
		$id: 'metricSchema',
	}
);
