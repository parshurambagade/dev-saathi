"use client";

import { AlertCircle } from "lucide-react";
import useLogin from "@/hooks/useLogin";
import { Link } from "react-router-dom";

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
          <input
            id="email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full bg-input text-foreground px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition duration-200 placeholder-muted-foreground"
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
          <input
            id="password"
            name="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full bg-input text-foreground px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition duration-200 placeholder-muted-foreground"
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
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-primary-foreground px-6 py-3 rounded-lg font-medium transition duration-200 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-card cursor-pointer"
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
              <span>Signing In...</span>
            </div>
          ) : (
            "Sign In"
          )}
        </button>
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
