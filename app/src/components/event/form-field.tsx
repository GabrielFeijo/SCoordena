import React from 'react';

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
				<label htmlFor={name}>{label}</label>
				<p className='text-sm text-muted-foreground'>{description}</p>
			</div>

			{children}
			{error && <p className='text-sm text-red-500'>{error}</p>}
		</div>
	);
};

export default FormField;
