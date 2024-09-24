// /app/middleware.js

import { NextResponse } from 'next/server';

export function middleware(request) {
    console.log('Middleware executed');

    const publicPaths = ['/login', '/']; // Paths that do not require authentication
    const currentPath = request.nextUrl.pathname;
    const isPublicPath = publicPaths.some(path => currentPath.startsWith(path));

    const token = request.cookies.get('token');
    console.log(`Current Path: ${currentPath}`);
    console.log(`Token: ${token}`);

    // Allow access to public paths
    if (isPublicPath) {
        console.log('Public path, allowing request');
        return NextResponse.next();
    }

    // Redirect to login if token is not present
    if (!token) {
        console.log('Token missing, redirecting to /login');
        return NextResponse.redirect(new URL('/login', request.url));
    }

    console.log('Token present, proceeding with request');
    return NextResponse.next();
}

// Apply middleware to all routes except public paths
export const config = {
    matcher: '/:path*', // Apply middleware to all routes
};
