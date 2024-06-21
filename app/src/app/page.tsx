/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { ModeToggle } from '@/components/mode-toogle';
import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore
import WAVES from 'vanta/dist/vanta.waves.min.js';
// @ts-ignore
import * as THREE from '../../public/scripts/three.min.js';
import { useTheme } from 'next-themes';

const Home = () => {
	const { theme } = useTheme();
	const [vantaEffect, setVantaEffect] = useState<any>(null);
	const vantaRef = useRef(null);

	useEffect(() => {
		if (!vantaEffect) {
			setVantaEffect(
				WAVES({
					el: vantaRef.current,
					THREE: THREE,
					mouseControls: true,
					touchControls: true,
					gyroControls: false,
					scale: 1,
					scaleMobile: 1.0,
					color: theme === 'dark' ? 0x1e293b : 0x848484,
				})
			);
		}
		return () => {
			if (vantaEffect) vantaEffect.destroy();
		};
	}, [vantaEffect]);

	useEffect(() => {
		if (vantaEffect) setVantaEffect(null);
	}, [theme]);

	return (
		<div
			ref={vantaRef}
			className='w-full h-[calc(100vh-2rem)] rounded-xl overflow-hidden  relative'
		>
			<div className='absolute top-3 left-3'>
				<ModeToggle />
			</div>
			<div className='absolute top-1/2 md:left-10 left-3 -translate-y-1/2 p-4 rounded'>
				<h1 className='font-baloo text-5xl font-bold '>Senac Coordena</h1>
				<p className=' max-w-[25rem] text-justify mt-1'>
					Our platform simplifies event management for organizers and
					participants alike, with an intuitive interface for planning,
					monitoring, and feedback.
				</p>
			</div>
		</div>
	);
};

export default Home;
