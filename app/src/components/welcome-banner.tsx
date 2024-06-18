const WelcomeBanner = () => {
	return (
		<section className='flex items-center bg-secondary rounded-xl h-fit w-full overflow-hidden p-1'>
			<div className='px-9'>
				<h2 className='text-4xl'>Hello Gabriel!</h2>
				<p>It’s good to see you again.</p>
			</div>
			<div className='bg-[url("/back.png")] bg-repeat h-32 w-72 rounded-r-xl'></div>
		</section>
	);
};

export default WelcomeBanner;
