import { API_BASE_URL } from "@/constants";
import { setUserInfo } from "@/store/slices/userSlice";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const useLogin = () => {
  const [email, setEmail] = useState("abhi@gmail.com");
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
      toast.error("Please fill in all fields", {
        description: "Email and password are required to login.",
      });
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
        toast.error("Login failed", {
          description: "Please check your credentials and try again.",
        });
        setError("Login failed. Please check your credentials.");
        return;
      }
      setError("");
      dispatch(setUserInfo(response?.data?.user));
      toast.success("Welcome back!", {
        description: `Good to see you again, ${response?.data?.user?.firstName}!`,
      });
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

      toast.error("Login failed", {
        description: errorMessage,
      });
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
