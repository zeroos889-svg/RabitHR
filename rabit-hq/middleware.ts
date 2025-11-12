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

  // Optional: role-based redirect placeholders
  // If user is authenticated and hits the signin page or bare locale root,
  // redirect them to a role-specific landing. Adjust mapping as pages expand.
  if (token) {
    const [_, maybeLocale, maybeAuth] = request.nextUrl.pathname.split('/');
    const locale = locales.includes(maybeLocale as any) ? maybeLocale : 'ar';
    const role = (token as any)?.role as string | undefined;

    const roleDest: Record<string, string> = {
      INVESTOR: `/${locale}/investor`,
      FOUNDER: `/${locale}/dashboard`,
      FINANCE: `/${locale}/dashboard`,
      TECH: `/${locale}/dashboard`,
      OPERATIONS: `/${locale}/dashboard`,
    };

    const isSignin = locales.includes(maybeLocale as any) && maybeAuth === 'auth' && request.nextUrl.pathname.endsWith('/signin');
    const isBareLocale = locales.includes(maybeLocale as any) && request.nextUrl.pathname === `/${maybeLocale}`;

    const destination = (role && roleDest[role]) || `/${locale}/dashboard`;

    if (isSignin || isBareLocale) {
      return NextResponse.redirect(new URL(destination, request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ['/', '/(ar|en)/:path*', '/dashboard/:path*', '/investor/:path*', '/api/:path*'],
}
