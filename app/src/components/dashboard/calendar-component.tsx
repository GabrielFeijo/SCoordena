import { Calendar } from '../ui/calendar';

const CalendarComponent = () => {
	const events = {
		'2024-06-03': ['Meeting with team', 'Project deadline'],
		'2024-06-05': ['Client call', 'Code review'],
		'2024-06-08': ['Workshop', 'Team building activity'],
		'2024-06-11': ['Product launch', 'Follow-up meeting'],
		'2024-06-14': ['One-on-one meeting', 'Weekly report submission'],
		'2024-06-17': ['Strategy session', 'Budget review'],
		'2024-06-21': ['Performance review', 'Company webinar'],
		'2024-06-23': ['Team lunch', 'Hackathon'],
		'2024-06-26': ['Conference call', 'Marketing campaign review'],
		'2024-06-29': ['Client presentation', 'Development sprint planning'],
	};

	return (
		<div className='bg-secondary rounded-xl p-4 '>
			<Calendar
				mode='single'
				events={events}
			/>
		</div>
	);
};

export default CalendarComponent;
