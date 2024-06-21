import { Schedule } from '@/api/get-event-by-id';
import { formatDate } from 'date-fns';

interface ScheduleItemProps extends Schedule {}

const ScheduleItem: React.FC<ScheduleItemProps> = ({
	title,
	description,
	startTime,
	endTime,
}: ScheduleItemProps) => (
	<div className='bg-secondary p-4 rounded'>
		<h4 className='text-lg font-medium'>{title}</h4>
		<p className='text-xs text-muted-foreground'>{description}</p>
		<p className='text-sm mt-2'>
			{`${formatDate(startTime, 'HH:mm')} - ${formatDate(endTime, 'HH:mm')}`}
		</p>
	</div>
);

export default ScheduleItem;