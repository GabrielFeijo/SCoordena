import Menu from '@/components/dashboard/menu';
import { ModeToggle } from '@/components/mode-toogle';

export default function Page() {
	return (
		<main className='flex m-6 h-[calc(100vh-3rem)]'>
			<Menu />

			<ModeToggle />
		</main>
	);
}
