import React from 'react';
import { Label } from '../ui/label';

interface FormFieldProps {
	name: string;
	label: string;
	description: string;
	error?: string;
	children: React.ReactNode;
}

const FormField = ({
	name,
	label,
	description,
	error,
	children,
}: FormFieldProps) => {
	return (
		<div className='space-y-2'>
			<div>
				<Label htmlFor={name}>{label}</Label>
				<p className='text-sm text-muted-foreground'>{description}</p>
			</div>

			{children}
			{error && <p className='text-sm text-red-500'>{error}</p>}
		</div>
	);
};

export default FormField;
