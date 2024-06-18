'use client';
import { useState } from 'react';
import { Calendar } from '../ui/calendar';

const CalendarComponent = () => {
	const [date, setDate] = useState<Date | undefined>(new Date());

	return (
		<div className='bg-secondary rounded-xl p-4 '>
			<Calendar
				mode='single'
				selected={date}
				onSelect={setDate}
			/>
		</div>
	);
};

export default CalendarComponent;
