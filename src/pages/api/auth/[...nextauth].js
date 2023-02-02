// import NextAuth from "next-auth";
// import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions = {
  session:{
    strategy: 'jwt'
  },
  providers:[
    CredentialsProvider({
      type: 'credentials',
      credential: {},
       authorize(credential, req){
        const { email, password } = credential;
        // peform oyu login logic
        // find out user from db
        if(email !== 'admin' || password !== '123'){
          return null;
        }
        return {id:'12', name: 'admin', email:'admin', };
      }
    })
  ],
  pages:{
    signIn: '/',
    // error: '/error',
    // signOut: ''
  }
};

export default NextAuth(authOptions);