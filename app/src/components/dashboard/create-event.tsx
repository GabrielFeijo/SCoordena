import React from 'react';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';

const CreateEvent = () => {
	return (
		<section className='bg-secondary flex h-fit w-full justify-between p-4 rounded-xl'>
			<div>
				<h3 className='text-lg font-semibold'>Create Event</h3>
				<p className='text-sm text-muted-foreground'>Create a new event</p>
			</div>

			<Button className='bg-primary p-2'>
				<Plus className='size-6' />
			</Button>
		</section>
	);
};

export default CreateEvent;
