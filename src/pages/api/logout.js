
import { serialize } from "cookie";
import axios from "../../../lib/axiosLaravel";

export default async function (req, res) {

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
    try {
      const response = await axios.get('api/auth/logout',
        {
          headers: {
            'Authorization': 'Bearer ' + '34|3fIvan46mHHk2ANUWcqzIjM31dQuB2yGOcnvN9c5'
          }
        }
      );
      // console.log(response.data);
    } catch (error) {
      console.log(error);
    }

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