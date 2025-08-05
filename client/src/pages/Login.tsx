import { LoginForm } from "@/components/login/LoginForm";
import type { RootState } from "@/store/appStore";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const user = useSelector((state: RootState) => state.user.userInfo);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <main className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2">
            DevSaathi
          </h1>
          <p className="text-slate-400 text-lg">Connect. Code. Collaborate.</p>
        </div>

        <LoginForm />
      </div>
    </main>
  );
};

export default Login;
