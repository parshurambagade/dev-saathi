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
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">D</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-primary mb-2">
            DevSaathi
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Connect. Code. Collaborate.
          </p>
        </div>

        <LoginForm />
      </div>
    </main>
  );
};

export default Login;
