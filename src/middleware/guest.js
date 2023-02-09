
import { NextResponse } from 'next/server'

const guest = (next) => {
  return async (req, res) => {
    const nonSecurePaths = ['/', '/about', '/contact'];
    const { pathname } = req.nextUrl;
    if (nonSecurePaths.includes(pathname)) {
      return NextResponse.next();
    }
    return next(req, res);
  }
}

export default guest;