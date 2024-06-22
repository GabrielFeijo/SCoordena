'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { capitalizeText } from '@/utils/capitilize-text';
import { parseISO } from 'date-fns';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
	className,
	classNames,
	showOutsideDays = true,
	events = {},
	...props
}: CalendarProps & { events: { [key: string]: string[] } }) {
	const [hoveredDate, setHoveredDate] = React.useState<Date | null>(null);

	const eventsDay = Object.keys(events).map(
		(dateString) => new Date(dateString + 'T00:00:00')
	);

	const eventsStyle = { border: '1px solid currentColor' };

	const handleMouseEnter = (date: Date) => {
		setHoveredDate(date);
	};

	const handleMouseLeave = () => {
		setHoveredDate(null);
	};

	const renderTooltip = () => {
		if (!hoveredDate) return null;

		const eventDetails = events[hoveredDate.toISOString().split('T')[0]];

		if (!eventDetails) return null;

		return (
			<div className='bg-secondary p-4 shadow-lg border rounded-md z-20  border-primary'>
				<h4 className='text-sm font-bold mb-2'>
					{capitalizeText(
						hoveredDate.toLocaleString('pt-BR', { dateStyle: 'full' })
					)}
				</h4>
				<ul className='text-xs'>
					{eventDetails.map((event, index) => (
						<li key={index}>{event}</li>
					))}
				</ul>
			</div>
		);
	};

	return (
		<div className='relative'>
			<DayPicker
				modifiers={{ events: eventsDay }}
				modifiersStyles={{ events: eventsStyle }}
				showOutsideDays={showOutsideDays}
				className={cn('p-3', className)}
				classNames={{
					months:
						'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
					month: 'space-y-4 w-full',
					caption: 'flex justify-center pt-1 relative items-center',
					caption_label: 'text-sm font-medium',
					nav: 'space-x-1 flex items-center',
					nav_button: cn(
						buttonVariants({ variant: 'outline' }),
						'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
					),
					nav_button_previous: 'absolute left-1',
					nav_button_next: 'absolute right-1',
					table: 'w-full border-collapse space-y-1',
					head_row: 'flex',
					head_cell:
						'text-muted-foreground rounded-md w-full font-normal text-[0.8rem] ',
					row: 'flex w-full mt-2',
					cell: 'h-9 w-full text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 ',
					day: cn(
						buttonVariants({ variant: 'ghost' }),
						'h-9 w-9 p-0 font-normal aria-selected:opacity-100 '
					),
					day_range_end: 'day-range-end',
					day_selected:
						'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
					day_today: 'bg-accent text-accent-foreground',
					day_outside:
						'day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
					day_disabled: 'text-muted-foreground opacity-50',
					day_range_middle:
						'aria-selected:bg-accent aria-selected:text-accent-foreground',
					day_hidden: 'invisible',
					...classNames,
				}}
				components={{
					IconLeft: ({ ...props }) => <ChevronLeft className='h-4 w-4' />,
					IconRight: ({ ...props }) => <ChevronRight className='h-4 w-4' />,
				}}
				{...props}
				onDayMouseEnter={handleMouseEnter}
				onDayMouseLeave={handleMouseLeave}
			/>
			{renderTooltip()}
		</div>
	);
}
Calendar.displayName = 'Calendar';

export { Calendar };
