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
    <div className="bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-700">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-slate-100 mb-2">Welcome Back</h2>
        <p className="text-slate-400 text-sm">
          Sign in to continue your developer journey
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleLogin}>
        {/* Email Field */}
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-slate-300 text-sm font-medium block"
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
            className="w-full bg-slate-700 text-slate-100 px-4 py-3 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 placeholder-slate-400"
          />
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <label
            htmlFor="password"
            className="text-slate-300 text-sm font-medium block"
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
            className="w-full bg-slate-700 text-slate-100 px-4 py-3 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 placeholder-slate-400"
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-center space-x-2 bg-red-900/30 border border-red-700 text-red-400 px-4 py-3 rounded-lg">
            <AlertCircle size={16} />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition duration-200 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-800 cursor-pointer"
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Signing In...</span>
            </div>
          ) : (
            "Sign In"
          )}
        </button>
      </form>

      {/* Register Link */}
      <div className="text-center mt-6 pt-6 border-t border-slate-700">
        <p className="text-slate-400 text-sm">
          New to DevSaathi?{" "}
          <Link
            to="/register"
            className="text-indigo-400 hover:text-indigo-300 font-medium transition duration-200 cursor-pointer"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
