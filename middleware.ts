// middleware.ts

import { NextResponse } from 'next/server';
import { createGuestUser } from './actions/user.action';
import { cookies } from 'next/headers';

export async function middleware(req: Request) {
    const cookieStore = cookies();
    const guestUidCookie = cookieStore.get('guest_uid')?.value;

    if (!guestUidCookie) {
        const guest = await createGuestUser();

        if (!guest) {
            return NextResponse.next();
        }

        const res = NextResponse.next();

        res.cookies.set({
            name: 'guest_uid',
            value: guest?.uid,
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7, // Set cookie for 7 days
        });

        return res;
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};
