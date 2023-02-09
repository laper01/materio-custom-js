
import { NextResponse } from 'next/server'
// middleware
import guest from './middleware/guest';
import secure from './middleware/secure';

function middlewares(req, res) {

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
    console.log("api icon")
    const url = req.url;
    if (matchUrlPattern('/icons/', url)) {
      const urlRedirect = req.nextUrl.clone()
      urlRedirect.pathname = '/'
      return NextResponse.redirect(urlRedirect);
    }
    return handler(req, res);
  }
}

function matchUrlPattern(patternUrl, url) {
  const pattern = new URLPattern({ pathname: `${patternUrl}*` })
  return pattern.test(url);
}

export default guest(
  secure(
    middlewares
  )
);
