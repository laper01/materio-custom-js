
import { NextResponse } from 'next/server'

export function middlewares(req, res) {
}

function guest(req) {
  const nonSecurePaths = ['/', '/about', '/contact'];
  if (nonSecurePaths.includes(req.path)) {
    return next();
  }
}

function user(req) {

}

const apiAuth = (handler) => {
  return async (req, res) => {
    const url = req.url;
    if (matchUrlPattern('/pages/', url)) {
      const urlRedirect = req.nextUrl.clone()
      urlRedirect.pathname = '/'
      return NextResponse.redirect(urlRedirect);
    }
    return handler(req, res);
  }
}

const apiIcon = (handler) => {
  return async (req, res) => {
    const url = req.url;
    if (matchUrlPattern('/icons/', url)) {
      const urlRedirect = req.nextUrl.clone()
      urlRedirect.pathname = '/'
      return NextResponse.redirect(urlRedirect);
    }
    return handler(req, res);
  }
}

export default apiIcon(apiAuth(middlewares));

function matchUrlPattern(patternUrl, url) {
  const pattern = new URLPattern({ pathname: `${patternUrl}*` })
  return pattern.test(url);
}