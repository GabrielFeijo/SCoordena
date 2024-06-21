import { ReactNode } from 'react';

interface SectionProps {
	icon: ReactNode;
	title: string;
	description?: string;
	children: ReactNode;
}

const Section = ({ icon, title, description, children }: SectionProps) => {
	return (
		<div>
			<h3 className='text-xl font-medium flex gap-1 items-center'>
				{icon}
				<span>{title}</span>
			</h3>
			{description && (
				<p className='text-sm text-muted-foreground mb-2'>{description}</p>
			)}

			{children}
		</div>
	);
};

export default Section;
