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
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { Pen, Trash } from 'lucide-react';
import { deleteEventHandler } from '@/api/delete-event';
import { useSession } from 'next-auth/react';
import { Role } from '@prisma/client';

const EventAdminActions = ({ id }: { id: string }) => {
	const { data } = useSession();

	const router = useRouter();
	const [open, setOpen] = useState(false);

	const deleteEvent = async () => {
		await deleteEventHandler(id);

		toast.success('Event has been deleted.');

		router.push('/events');
	};

	if (!data || data.user.role !== Role.ADMIN) {
		return null;
	}

	return (
		<div className='flex items-center justify-between mt-4'>
			<Button
				variant='secondary'
				asChild
			>
				<Link href={`/event/edit/${id}`}>
					<Pen className='mr-2 size-4' />
					Edit Event
				</Link>
			</Button>
			<Button
				variant='destructive'
				onClick={() => setOpen(true)}
			>
				<Trash className='mr-2 size-4' />
				Delete Event
			</Button>

			<AlertDialog
				open={open}
				onOpenChange={setOpen}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
						<AlertDialogDescription>
							This action cannot be undone. This will permanently delete the
							event.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction onClick={deleteEvent}>
							Continue
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
};

export default EventAdminActions;