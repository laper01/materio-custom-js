
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import axios from "../../../lib/axiosLaravel";

const SECRET = process.env.SECRET;

export default async function (req, res) {

  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' })
    return
  }

  // console.log(req.headers);

  const { email, password } = req.body;
  // TODO : tentuin simpen bearer token di mana
  // TODO : simpen bearar token di http only cookie
  // TODO : encode token menggunkan sign
  try {
    const response = await axios.post('/api/auth/login', {
      email: email,
      password: password
    });

    console.log(response.data);
    if (response.data.meta.status == 'success') {
      const serialised = serialize('oursitejwt', "token", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: false,
        maxAge: 60 * 60,
        path: "/"
      });

      res.setHeader('set-Cookie', serialised);
      res.status(200).json({ "message": "Success!", "data": response.data })
    } else {
      res.status(401).json({ 'message': 'invalid credential' })
    }

  } catch (error) {
    console.log(error);
  }

}