
import { NextResponse } from 'next/server'

const secure = (next) => {
  return async (req, res) => {
    const securePath = ['/beranda/', 'ggg'];
    const { pathname } = req.nextUrl;
    if (securePath.includes(pathname)) {
      const { cookies } = req;
      const jwt = cookies.get('oursitejwt')?.value;
      if (!jwt) {
        const urlRedirect = req.nextUrl.clone()
        urlRedirect.pathname = '/'
        console.log("=")
        return NextResponse.redirect(urlRedirect);
      }
    }
    return next(req, res);
  }
}



export default secure;


