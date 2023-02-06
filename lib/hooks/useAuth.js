
import useSWR from 'swr'
import axios from '../axios'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react';


export default function useAuth({ middleware } = {}) {

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);


  const { data: user, error, mutate } = useSWR('/api/auth/user/',
    () => axios.get('/api/auth/user/').then(response => { console.log(response);  return response.data.data}));

  useEffect(() => {
    if (user || error) {
      setIsLoading(false);
    }
    if (middleware = 'guest' && user) router.push('/');
    if (middleware = 'auth' && !user && error) logout();
  }, [user, error])

  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const login = async ({ setErrors, ...props }) => {

    setErrors([]);

    await csrf();
    axios.post('/api/auth/login', props)
      .then(() => mutate() && router.push('/beranda'))
      .catch(error => {
        // console.log(error.response.data);
        // if (error.response.status != 422) throw error;
        setErrors(error.response.data);
      })
  }

  const logout = async () => {
    await axios.post('/logout');
    mutate(null);
    console.log("ddd");
    router.push('/');
  }

  return {
    user,
    csrf,
    login,
    logout,
    isLoading
  }


}