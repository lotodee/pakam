import { useState } from "react";
import { useAuthContext } from "./useAuthContext";


interface LoginCredentials {
    username: string;
    password: string;
  }
  
  export const useLogin = () => {
    const [error, setError] = useState<null | any>(null);
    const [isLoading, setIsLoading] = useState<boolean | null>(null);
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const { dispatch } = useAuthContext();
  
    const login = async ({ username, password }: LoginCredentials) => {
      setIsLoading(true);
      setError(null);
  
      const response = await fetch("http://localhost:5000/api/user/login", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
  
      const json = await response.json();
  console.log(json)
      if (!response.ok) {
        setIsLoading(false);
        setError(json);
      }
  
      if (response.ok) {
        // Save user to local storage
        localStorage.setItem('user', JSON.stringify(json));
  
        // Update the auth context
        dispatch({ type: 'LOGIN', payload: json });
        setIsLoading(false);
        setLoggedIn(true);
      }
    };
  
    return { login, isLoading, error, loggedIn };
  };
  