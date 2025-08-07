import { API_BASE_URL } from "@/constants";
import { setUserInfo } from "@/store/slices/userSlice";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const useRegistration = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!firstName || !email || !password) {
      toast.error("Please fill in all required fields", {
        description: "First name, email and password are required.",
      });
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
        toast.error("Registration failed", {
          description: "Please try again with different details.",
        });
        setError("Registration failed.");
        return;
      }
      dispatch(setUserInfo(response.data.user));
      toast.success("Welcome to DevSaathi!", {
        description: `Hi ${firstName}! Let's complete your profile to get started.`,
      });
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

      toast.error("Registration failed", {
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
