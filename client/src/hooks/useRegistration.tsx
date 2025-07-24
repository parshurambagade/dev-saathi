import { API_BASE_URL } from "@/constants";
import { setUserInfo } from "@/store/slices/userSlice";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const useRegistration = () => {
  const [firstName, setFirstName] = useState("Parshuram");
  const [lastName, setLastName] = useState("Bagade");
  const [email, setEmail] = useState("parshuram@gmail.com");
  const [password, setPassword] = useState("Pass@123");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!firstName || !email || !password) {
      setError("Firstname, Email and password are required.");
      setIsLoading(false);
      return;
    }
    try {
      const response = await axios.post(
        API_BASE_URL + "/register",
        {
          firstName,
          lastName,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status !== 201) {
        setError("Registration failed.");
        return;
      }
      dispatch(setUserInfo(response.data.user));
      navigate("/profile");
    } catch (err: unknown) {
      console.error("Registration error:", err);

      const axiosError = err as AxiosError;
      const errorMessage =
        (axiosError?.response?.data &&
        typeof axiosError.response.data === "string"
          ? axiosError.response.data
          : // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (axiosError?.response?.data as any)?.message) ||
        "Registration failed. Please try again.";
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
    firstName,
    setFirstName,
    lastName,
    setLastName,
    error,
    setError,
    isLoading,
    setIsLoading,
    handleRegistration,
  };
};

export default useRegistration;
