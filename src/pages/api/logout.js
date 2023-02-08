
import { serialize } from "cookie";

export default function (req, res) {

  if (req.method !== 'GET') {
    res.status(405).send({ message: 'not allowed requests' })
    return
  }

  const { cookies } = req
  let jwt = null;
  if (cookies) {
    jwt = cookies?.oursitejwt;
  }

  if (!jwt) {
    return res.json({ "message": "your not loggin" })
  } else {
    const serialised = serialize('oursitejwt', null, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: false,
      maxAge: -1,
      path: "/"
    });
    res.setHeader('set-Cookie', serialised);
    res.status(200).json({ "message": "logout succes!" })
  }
}