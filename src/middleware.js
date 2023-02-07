
export default function middleware(req, res) {
  const { cookies } = req

  // const jwt = {...cookies}
  // console.log(jwt['_parsed'].get('oursitejwt').value);
  // inget ini bentuknya map
  const jwt = cookies.get('oursitejwt')?.value;
  
}