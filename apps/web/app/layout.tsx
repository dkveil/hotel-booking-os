import type { Metadata } from 'next';
import { DM_Serif_Display, Lexend } from 'next/font/google';
import './globals.css';
import '@repo/tailwind-config';

const dmSans = DM_Serif_Display({
	variable: '--font-heading',
	subsets: ['latin'],
	weight: ['400'],
});

const lexend = Lexend({
	variable: '--font-base',
	subsets: ['latin'],
	weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
	title: 'Hotel Booking System',
	description: 'Modern hotel booking and reservation system',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`${lexend.variable} ${dmSans.variable} font-base`}>
				{children}
			</body>
		</html>
	);
}
