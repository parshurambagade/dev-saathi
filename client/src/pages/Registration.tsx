import { RegistrationForm } from "@/components/registration/RegistrationForm";
import type { RootState } from "@/store/appStore";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const user = useSelector((state: RootState) => state.user.userInfo);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <main className="flex items-start justify-center min-h-screen py-4 md:py-12 px-2 md:px-4 bg-gray-100">
      <RegistrationForm />
    </main>
  );
};

export default Registration;
