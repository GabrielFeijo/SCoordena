/* eslint-disable @next/next/no-img-element */
import truncateText from '@/utils/truncate-text-';
import Link from 'next/link';

const UserCard = ({
	name,
	occupation,
	bio,
	image,
}: {
	name: string;
	occupation: string;
	bio: string;
	image: string;
}) => {
	return (
		<Link
			className='rounded-xl p-4 bg-secondary w-full min-w-96'
			href={`https://github.com/GabrielFeijo`}
		>
			<div className='flex gap-2'>
				<div
					style={{
						backgroundImage: `url(${image})`,
					}}
					className=' min-w-36 min-h-36 rounded bg-cover bg-center bg-no-repeat relative'
				>
					<div className='absolute -bottom-[.1rem] left-0 text-[.6rem] w-full text-center font-medium'>
						<span className='bg-secondary px-1.5 antialiased'>
							Generated with AI
						</span>
					</div>
				</div>

				<div className='w-full '>
					<h2 className='text-xl font-semibold'>{name}</h2>
					<p className='text-sm text-muted-foreground'>{occupation}</p>

					<p className='mt-4 text-sm'>{bio}</p>
				</div>
			</div>
		</Link>
	);
};

export default UserCard;
