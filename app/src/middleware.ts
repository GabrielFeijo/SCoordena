import { Role } from '@prisma/client';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	const token = await getToken({ req: request });

	if (!token) {
		return NextResponse.redirect(new URL('/api/auth/signin', request.url));
	}

	if (protectedAdminRoutes.some((route) => pathname.startsWith(route))) {
		if (token.role !== Role.ADMIN) {
			return NextResponse.redirect(new URL('/', request.url));
		}
	}
}

const protectedAdminRoutes = [
	'/dashboard',
	'/event/create',
	'/event/schedule',
	'/documentation',
];

export const config = {
	matcher: [
		'/documentation',
		'/dashboard',
		'/events',
		'/events/:path*',
		'/event/create',
		'/event/schedule/:path*',
	],
};
