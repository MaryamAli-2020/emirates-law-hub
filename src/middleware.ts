import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const hasToken = request.cookies.has('firebaseIdToken');
    const url = request.nextUrl.clone()

    if (url.pathname.startsWith('/dashboard') && !hasToken) {
        url.pathname = '/login'
        return NextResponse.redirect(url)
    }

    if (url.pathname === '/login' && hasToken) {
        url.pathname = '/dashboard'
        return NextResponse.redirect(url)
    }

    return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/dashboard/:path*', '/login'],
}
