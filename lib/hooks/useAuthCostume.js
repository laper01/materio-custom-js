
import axios from '../axios';
import { useRouter } from "next/router";
import { useState } from "react"

export default function useAuthCostume({ } = {}) {

  const router = useRouter();

  const [user, setUser] = useState();
  

  const login = async ({ setErrors, ...props }) => {
    try {
      const response = await axios.post('/api/login', {
        ...props
      });
      router.push('/beranda');
      // console.log(response);
    } catch (error) {
      // console.log(error);
    }
  }

  const logout = async () => {
    try {
      const response = await axios.get('/api/logout');
      router.push('/');
    } catch (error) {
      console.log(error)
    }
  }

  return {
    user,
    login,
    logout
  }
}
