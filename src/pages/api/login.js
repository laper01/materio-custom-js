import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

const SECRET = process.env.SECRET;

export default async function (req, res) {
  const { email, password } = req.body;

  if (email == 'admin' && password == 'admin') {
    const serialised = serialize('oursitejwt', "token",{
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: false,
      maxAge: 60 * 60,
      path: "/"
    });

    res.setHeader('set-Cookie', serialised);
    res.status(200).json({ "message": "Success!" })
  } else {
    res.status(401).json({ 'message': 'invalid credential' })
  }

}