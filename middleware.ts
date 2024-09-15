import { NextResponse } from 'next/server';
import { createGuestUser } from '@/services/userService';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const guestUid = req.cookies.get('guest_uid')?.value;

  if (!guestUid) {
    const guestUser = await createGuestUser();

    if (!guestUser) {
      return NextResponse.next();
    }

    const res = NextResponse.next();
    res.cookies.set('guest_uid', guestUser.uid, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
