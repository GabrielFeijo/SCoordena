'use client';
import { ModeToggle } from '@/components/mode-toogle';
import { useTheme } from 'next-themes';
import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
// @ts-ignore
import GLOBE from 'vanta/dist/vanta.globe.min.js';

const Home = () => {
	const { theme } = useTheme();
	const [vantaEffect, setVantaEffect] = useState<any>(0);
	const vantaRef = useRef(null);

	useEffect(() => {
		if (!vantaEffect) {
			setVantaEffect(
				GLOBE({
					el: vantaRef.current,
					THREE: THREE,
					mouseControls: true,
					touchControls: true,
					gyroControls: false,
					minHeight: 200.0,
					minWidth: 200.0,
					scale: 1.0,
					scaleMobile: 1.0,
					backgroundAlpha: 0,
				})
			);
		}
		return () => {
			if (vantaEffect) vantaEffect.destroy();
		};
	}, [vantaEffect]);

	return (
		<div
			ref={vantaRef}
			className='w-full h-[calc(100vh-2rem)] rounded-xl overflow-hidden bg-[#242424] relative'
		>
			<div className='absolute top-3 left-3'>
				<ModeToggle />
			</div>
			<div className='absolute top-1/2 md:left-10 left-3 -translate-y-1/2 bg-[#242424] p-4'>
				<h1 className='font-baloo text-5xl font-bold text-white'>
					Senac Coordena
				</h1>
				<p className='text-sm text-muted-foreground max-w-80 text-justify mt-1'>
					Our platform simplifies event management for organizers and
					participants alike, with an intuitive interface for planning,
					monitoring, and feedback.
				</p>
			</div>
		</div>
	);
};

export default Home;
