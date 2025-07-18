import axios from "axios";
import { useState } from "react";

const useLogin = () => {
  const [email, setEmail] = useState("parshuram@gmail.com");
  const [password, setPassword] = useState("Pass@123");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!email || !password) {
      setError("Email and password are required.");
      setIsLoading(false);
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:7777/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        console.log("Login successful:", response.data);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    setError,
    isLoading,
    setIsLoading,
    handleLogin,
  };
};

export default useLogin;
