import { useSession } from 'next-auth/react';

const WelcomeBanner = () => {
	const { data } = useSession();

	return (
		<section className='flex justify-between items-center bg-secondary rounded-xl h-full w-full overflow-hidden p-1'>
			<div className='px-9 py-9 lg:py-0'>
				<h2 className='xl:text-4xl lg:text-3xl md:text-2xl text-xl whitespace-nowrap'>
					Hello {data?.user?.name?.split(' ')[0] || 'Anonymous'}!
				</h2>
				<p>It’s good to see you again.</p>
			</div>
			<div className='bg-[url("/back.png")] bg-repeat h-full w-[45%]  rounded-r-xl'></div>
		</section>
	);
};

export default WelcomeBanner;
