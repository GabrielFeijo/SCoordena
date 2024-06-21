'use client';
import React from 'react';
import { Plus } from 'lucide-react';
import Link from 'next/link';

const CreateEvent = () => {
	return (
		<section className='bg-secondary flex h-fit w-full items-center justify-between p-4 rounded-xl'>
			<div>
				<h3 className='text-lg font-semibold'>Create Event</h3>
				<p className='text-sm text-muted-foreground'>Create a new event</p>
			</div>

			<Link
				className='bg-primary p-2 rounded h-fit'
				href='/event/create'
			>
				<Plus className='size-6 text-secondary' />
			</Link>
		</section>
	);
};

export default CreateEvent;
