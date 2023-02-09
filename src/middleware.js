
import { NextResponse } from 'next/server'
// middleware
import guest from './middleware/guest';
import secure from './middleware/secure';

function middlewares(req, res) {

}

export default guest(
  secure(
    middlewares
  )
);
