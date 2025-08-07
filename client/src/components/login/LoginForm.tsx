"use client";

import { AlertCircle } from "lucide-react";
import useLogin from "@/hooks/useLogin";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function LoginForm() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    isLoading,
    handleLogin,
  } = useLogin();

  return (
    <div className="bg-card p-6 rounded-2xl shadow-xl border border-border">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Welcome Back
        </h2>
        <p className="text-muted-foreground text-sm">
          Sign in to continue your developer journey
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleLogin}>
        {/* Email Field */}
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-muted-foreground text-sm font-medium block"
          >
            Email Address
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            className="bg-background border-border focus:border-primary focus:ring-1 focus:ring-primary"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <label
            htmlFor="password"
            className="text-muted-foreground text-sm font-medium block"
          >
            Password
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            className="bg-background border-border focus:border-primary focus:ring-1 focus:ring-primary"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-center space-x-2 bg-destructive/20 border border-destructive text-destructive px-4 py-3 rounded-lg">
            <AlertCircle size={16} />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full cursor-pointer"
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
              <span>Signing In...</span>
            </div>
          ) : (
            "Sign In"
          )}
        </Button>
      </form>

      {/* Register Link */}
      <div className="text-center mt-6 pt-6 border-t border-border">
        <p className="text-muted-foreground text-sm">
          New to DevSaathi?{" "}
          <Link
            to="/register"
            className="text-primary hover:text-primary/80 font-medium transition duration-200 cursor-pointer"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
