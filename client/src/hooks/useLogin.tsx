import { API_BASE_URL } from "@/constants";
import { setUserInfo } from "@/store/slices/userSlice";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const [email, setEmail] = useState("parshuram@gmail.com");
  const [password, setPassword] = useState("Pass@123");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        API_BASE_URL + "/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status !== 200) {
        setError("Login failed. Please check your credentials.");
        return;
      }

      dispatch(setUserInfo(response?.data?.user));
      navigate("/");
    } catch (err: unknown) {
      console.error("Login error:", err);

      const axiosError = err as AxiosError;
      const errorMessage =
        (axiosError?.response?.data &&
        typeof axiosError.response.data === "string"
          ? axiosError.response.data
          : // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (axiosError?.response?.data as any)?.message) ||
        "Login failed. Please try again.";
      setError(errorMessage);
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
