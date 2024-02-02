import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

interface UserData {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  // Add other properties as needed
}

export const useSignup = () => {
  const [error, setError] = useState<null | any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [registered, setRegistered] = useState<boolean>(false);
  const { dispatch } = useAuthContext();

  const signup = async (userData: UserData) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("http://localhost:5000/api/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json);
    }

    if (response.ok) {
      // Save user to local storage
      localStorage.setItem("user", JSON.stringify(json));
      // Update the auth context
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
      setRegistered(true);
    }
  };

  return { signup, isLoading, error, registered };
};
