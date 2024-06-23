'use client';
import Image from 'next/image';

import { motion } from 'framer-motion';

const Page = () => {
	return (
		<div>
			<div className='flex flex-col items-center justify-center h-[calc(100vh-2rem)] rounded-xl space-y-4 bg-secondary'>
				<motion.div
					initial={{ opacity: 0, y: -50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<Image
						src='/construction.svg'
						alt='Logo'
						width={350}
						height={350}
					/>
				</motion.div>
				<motion.h1
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1, delay: 0.5 }}
					className='text-3xl font-semibold'
				>
					This page is under construction
				</motion.h1>
				<motion.p
					initial={{ scale: 0.5, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ duration: 1, delay: 1 }}
					className='text-xl text-muted-foreground'
				>
					Stay tuned for something amazing!
				</motion.p>
			</div>
		</div>
	);
};

export default Page;
