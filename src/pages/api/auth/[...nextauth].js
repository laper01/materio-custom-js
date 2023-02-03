
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const authOptions = {
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credential: {},
      authorize(credential, req) {
        const { email, password } = credential
        // peform oyu login logic
        // find out user from db
        if (email !== 'admin' || password !== '123') {
          throw new Error('login gagal')
        }
        return {
          id: '12',
          name: 'admin',
          email: 'admin',
          role : 'admin'
        }
      }
    })
  ],
  pages: {
    signIn: '/'
    // error: '/error',
    // signOut: ''
  },
  callbacks:{
    jwt(params){
      // console.log(params)
      // menulis ulang token agar bisa memasukan role
      if(params.user?.role){
        params.token.role = params.user.role;
      }
      // return final token
      return params.token;
    }
  }
}

export default NextAuth(authOptions)
