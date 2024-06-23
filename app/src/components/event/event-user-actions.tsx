import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

import { Check, Ticket, TicketCheck } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { Role } from '@prisma/client';
import { useQueryClient } from '@tanstack/react-query';
import { Event, Registration } from '@/api/event/get-event-by-id';
import { registerToEventHandler } from '@/api/registration/register-to-event';
import Link from 'next/link';

const EventUserActions = ({
	id,
	registrations,
}: {
	id: string;
	registrations: Registration[];
}) => {
	const queryClient = useQueryClient();
	const { data } = useSession();

	const [open, setOpen] = useState(false);

	if (!data || data.user.role !== Role.USER) {
		return null;
	}

	const registerToEvent = async () => {
		const response = await registerToEventHandler({
			eventId: id,
			userId: data.user.id as string,
		});

		queryClient.setQueryData(['get-event', id], (oldData: Event) => {
			const data = {
				...oldData,
				registrations: [response, ...oldData.registrations],
			};

			return data;
		});
	};

	const isRegistered = registrations.some(
		(registration) => registration.user.id === data.user.id
	);

	return (
		<div className='flex items-center justify-between mt-4'>
			<Button
				variant='secondary'
				asChild
			>
				<Link href='/events/my-events'>
					<TicketCheck className='mr-2 size-4' />
					My events
				</Link>
			</Button>
			<Button
				onClick={() => setOpen(true)}
				disabled={isRegistered}
			>
				{isRegistered ? (
					<>
						<Check className='mr-2 size-4' />
						Already registered
					</>
				) : (
					<>
						<Ticket className='mr-2 size-4' />
						Register to event
					</>
				)}
			</Button>

			<AlertDialog
				open={open}
				onOpenChange={setOpen}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>
							Do you want to register for this event?
						</AlertDialogTitle>
						<AlertDialogDescription>
							You will be able to see this event in your calendar.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction onClick={registerToEvent}>
							Continue
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
};

export default EventUserActions;
