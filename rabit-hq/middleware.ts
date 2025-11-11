import createMiddleware from 'next-intl/middleware';
import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'
import { locales } from './i18n';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: 'ar',
  localePrefix: 'always'
});

export async function middleware(request: NextRequest) {
  // Handle i18n first
  const response = intlMiddleware(request);
  
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })

  // Protected routes (without locale prefix)
  const protectedPaths = ['/dashboard', '/investor', '/api/capital']
  const pathname = request.nextUrl.pathname.replace(/^\/(ar|en)/, ''); // Remove locale prefix

  if (protectedPaths.some((path) => pathname.startsWith(path))) {
    if (!token) {
      const locale = request.nextUrl.pathname.split('/')[1];
      return NextResponse.redirect(new URL(`/${locale}/auth/signin`, request.url))
    }
  }

  return response;
}

export const config = {
  matcher: ['/', '/(ar|en)/:path*', '/dashboard/:path*', '/investor/:path*', '/api/:path*'],
}
