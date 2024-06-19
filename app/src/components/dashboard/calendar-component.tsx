import { useQuery } from '@tanstack/react-query';
import { Calendar } from '../ui/calendar';
import { getEvents } from '@/api/get-events';

const CalendarComponent = () => {
	const { data } = useQuery({
		queryKey: ['get-calendar-events'],
		queryFn: getEvents,
	});

	const events: { [key: string]: string[] } = {};

	data?.forEach((event) => {
		const stringDate = event.date.toString();
		if (!events[stringDate]) {
			events[stringDate] = [];
		}
		events[stringDate].push(event.name);
	});

	return (
		<div className='bg-secondary rounded-xl p-4 h-[23.7rem]'>
			<Calendar
				mode='single'
				events={events}
			/>
		</div>
	);
};

export default CalendarComponent;