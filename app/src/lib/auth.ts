import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from '@/lib/prisma';
import { Adapter } from 'next-auth/adapters';
import { AuthOptions } from 'next-auth';

export const authOptions: AuthOptions = {
	session: { strategy: 'jwt' },
	adapter: PrismaAdapter(db) as Adapter,
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
	],
	callbacks: {
		async session({ session, token }) {
			session.user.role = token.role;
			session.user.id = token.id;
			return session;
		},

		async jwt({ token, user }) {
			return { ...token, ...user };
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
};
