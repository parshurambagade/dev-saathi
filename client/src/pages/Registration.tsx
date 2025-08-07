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
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center px-4 py-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-30"></div>
      <div className="w-full max-w-md relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">D</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent mb-2">
            DevSaathi
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Join the Developer Community
          </p>
        </div>

        <RegistrationForm />
      </div>
    </main>
  );
};

export default Registration;
