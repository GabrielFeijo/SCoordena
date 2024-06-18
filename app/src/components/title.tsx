import { ReactNode } from 'react';
import { ModeToggle } from './mode-toogle';

const Title = ({ children }: { children: ReactNode }) => {
	return (
		<div className='flex justify-between'>
			<h1 className='text-3xl font-medium'>{children}</h1>
			<ModeToggle />
		</div>
	);
};

export default Title;
