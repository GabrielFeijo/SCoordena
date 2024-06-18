interface CardProps {
	value: number;
	description: string;
}

const Card = ({ value, description }: CardProps) => {
	return (
		<div className='bg-secondary rounded-xl p-4 w-full h-fit text-left'>
			<h3 className='text-3xl font-semibold'>{value}</h3>
			<span className='text-sm'>{description}</span>
		</div>
	);
};

export default Card;
