'use client';
import { NextPage } from 'next';
import Image from 'next/image';
import { motion } from 'framer-motion';

const NotFound: NextPage = () => {
	return (
		<div className='flex flex-col items-center justify-center h-[calc(100vh-2rem)] space-y-4 bg-secondary  rounded-xl'>
			<motion.div
				initial={{ opacity: 0, y: -50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1 }}
			>
				<Image
					src='/404.svg'
					alt='404 Image'
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
				Page Not Found
			</motion.h1>
			<motion.p
				initial={{ scale: 0.5, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ duration: 1, delay: 1 }}
				className='text-xl text-gray-400'
			>
				The page you are looking for does not exist.
			</motion.p>
			<motion.a
				href='/'
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 1, delay: 1.5 }}
				className='text-blue-500 hover:underline'
			>
				Go back to Home
			</motion.a>
		</div>
	);
};

export default NotFound;
