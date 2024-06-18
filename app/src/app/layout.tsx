import type { Metadata } from 'next';
import { Poppins, Baloo_Bhai_2 } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/providers/theme-provider';
import Menu from '@/components/menu';

const poppins = Poppins({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700', '800', '900'],
});
export const metadata: Metadata = {
	title: 'Senac Coordena',
	description:
		'Uma aplicação fullstack para gerenciamento de eventos, ajudando organizadores a planejar, monitorar e avaliar eventos de maneira eficiente.',
};

const Baloo_Bhai = Baloo_Bhai_2({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-baloo-bhai',
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang='pt-BR'
			className={Baloo_Bhai.variable}
		>
			<body className={`${poppins.className} antialiased `}>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange
				>
					<div className='fixed h-[calc(100vh-2rem)] top-4 left-4 '>
						<Menu />
					</div>

					<div className='m-4 w-[calc(100%-14.8rem)] ml-auto '>{children}</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
