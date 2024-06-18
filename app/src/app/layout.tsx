import type { Metadata } from 'next';
import { Inter, Baloo_Bhai_2 } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/providers/theme-provider';

const inter = Inter({ subsets: ['latin'] });
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
			<body className={inter.className}>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange
				>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
