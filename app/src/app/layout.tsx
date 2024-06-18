import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });
export const metadata: Metadata = {
	title: 'Senac Coordena',
	description:
		'Uma aplicação fullstack para gerenciamento de eventos, ajudando organizadores a planejar, monitorar e avaliar eventos de maneira eficiente.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='pt-BR'>
			<body className={inter.className}>{children}</body>
		</html>
	);
}
