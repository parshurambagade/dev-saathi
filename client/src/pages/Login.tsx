import { LoginForm } from "@/components/login/LoginForm";
import React from "react";

const Login = () => {
  return (
    <main className="flex items-start justify-center min-h-screen py-4 md:py-12 px-2 md:px-4 bg-gray-100">
      <LoginForm />
    </main>
  );
};

export default Login;
