// import middleware from "next-auth/middleware";
// import { NextResponse } from 'next/server'

// export default function middleware(req) {
//   let url = req.url
//   if (url.includes('/beranda')) {
//     return NextResponse.redirect('http://localhost:3000/')
//   }
// }

export { default } from 'next-auth/middleware';

export const config = { matcher: ['/beranda'] }
