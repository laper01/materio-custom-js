
import { withAuth } from 'next-auth/middleware';
import { NextRequest, NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    return NextResponse.rewrite(new URL('/beranda', req.url));
  }, {
  callbacks: {
    authorized({token}) {
      // harus return true kalo mau bisa diakases middleware
      return token?.role === 'admin';
    }
  }
});


export const config = { matcher: ['/beranda'] };
