import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const AvatarComponent = ({ imageUrl }: { imageUrl?: string | null }) => {
	return (
		<Avatar>
			<AvatarImage
				src={imageUrl || 'https://github.com/GabrielFeijo.png'}
				alt='@shadcn'
			/>
			<AvatarFallback>CN</AvatarFallback>
		</Avatar>
	);
};

export default AvatarComponent;
