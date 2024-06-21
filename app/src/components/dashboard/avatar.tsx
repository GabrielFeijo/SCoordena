import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const AvatarComponent = ({
	imageUrl,
	size,
}: {
	imageUrl?: string | null;
	size?: string;
}) => {
	return (
		<Avatar className={`${size ? `${size}` : ''}`}>
			<AvatarImage
				src={imageUrl || 'https://github.com/GabrielFeijo.png'}
				alt='@shadcn'
				className='rounded-full'
			/>
			<AvatarFallback>CN</AvatarFallback>
		</Avatar>
	);
};

export default AvatarComponent;
