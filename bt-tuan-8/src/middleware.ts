import type { NextRequest } from 'next/server';
import { detectBot } from '@arcjet/next';
import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import arcjet from '@/libs/Arcjet';
import { routing } from './libs/I18nRouting';

const handleI18nRouting = createMiddleware(routing);

const aj = arcjet.withRule(
  detectBot({
    mode: 'LIVE',
    allow: [
      'CATEGORY:SEARCH_ENGINE',
      'CATEGORY:PREVIEW',
      'CATEGORY:MONITOR',
    ],
  }),
);

export default async function middleware(request: NextRequest) {
  if (process.env.ARCJET_KEY) {
    const decision = await aj.protect(request);
    if (decision.isDenied()) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
  }

  const pathname = request.nextUrl.pathname;
  const isDashboardPage = pathname.includes('/dashboard');
  const isAdminPage = pathname.includes('/admin');

  if (isDashboardPage || isAdminPage) {
    const session = await auth();

    if (!session || !session.user) {
      const signInUrl = new URL('/sign-in', request.url);
      return NextResponse.redirect(signInUrl);
    }

    if (isAdminPage && session.user.role !== 'admin') {
      const denyUrl = new URL('/dashboard?error=Lop+1+Middleware+chan:+Chi+admin+moi+duoc+vao+trang+admin', request.url);
      return NextResponse.redirect(denyUrl);
    }
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: '/((?!api|_next|_vercel|monitoring|.*\\..*).*)',
};
