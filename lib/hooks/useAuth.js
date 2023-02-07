import axios from "axios";
import { useState } from "react"



export default function useAuth({ } = {}) {

  const [user, setUser] = useState();

  const login = async ({ setErrors, ...props }) => {
    try {
      const response = await axios.post('/api/login', {
        ...props
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return {
    user,
    login
  }
}
