"use client";

import { AlertCircle } from "lucide-react";
import useRegistration from "@/hooks/useRegistration";
import { Link } from "react-router-dom";

export function RegistrationForm() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    error,
    isLoading,
    handleRegistration,
  } = useRegistration();

  return (
    <div className="bg-card p-6 rounded-2xl shadow-xl border border-border">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Create Account
        </h2>
        <p className="text-muted-foreground text-sm">
          Start your journey in the developer community
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleRegistration}>
        {/* Name Fields Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* First Name Field */}
          <div className="space-y-2">
            <label
              htmlFor="firstName"
              className="text-muted-foreground text-sm font-medium block"
            >
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="John"
              className="w-full bg-input text-foreground px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition duration-200 placeholder-muted-foreground"
            />
          </div>

          {/* Last Name Field */}
          <div className="space-y-2">
            <label
              htmlFor="lastName"
              className="text-muted-foreground text-sm font-medium block"
            >
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Doe"
              className="w-full bg-input text-foreground px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition duration-200 placeholder-muted-foreground"
            />
          </div>
        </div>

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
            placeholder="john.doe@example.com"
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
            placeholder="Create a strong password"
            className="w-full bg-input text-foreground px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition duration-200 placeholder-muted-foreground"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Use at least 8 characters with a mix of letters, numbers & symbols
          </p>
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
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Creating Account...</span>
            </div>
          ) : (
            "Create Account"
          )}
        </button>
      </form>

      {/* Login Link */}
      <div className="text-center mt-6 pt-6 border-t border-border">
        <p className="text-muted-foreground text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary hover:text-primary/80 font-medium transition duration-200 cursor-pointer"
          >
            Sign in instead
          </Link>
        </p>
      </div>

      {/* Terms Notice */}
      <div className="text-center mt-4">
        <p className="text-xs text-muted-foreground">
          By creating an account, you agree to DevSaathi's{" "}
          <span className="text-primary cursor-pointer hover:text-primary/80">
            Terms of Service
          </span>{" "}
          and{" "}
          <span className="text-primary cursor-pointer hover:text-primary/80">
            Privacy Policy
          </span>
        </p>
      </div>
    </div>
  );
}
