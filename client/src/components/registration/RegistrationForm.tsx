"use client";

import { AlertCircle } from "lucide-react";
import useRegistration from "@/hooks/useRegistration";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
            <Input
              id="firstName"
              name="firstName"
              type="text"
              className="bg-background border-border focus:border-primary focus:ring-1 focus:ring-primary"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="John"
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
            <Input
              id="lastName"
              name="lastName"
              type="text"
              required
              className="bg-background border-border focus:border-primary focus:ring-1 focus:ring-primary"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Doe"
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
          <Input
            id="email"
            name="email"
            type="email"
            className="bg-background border-border focus:border-primary focus:ring-1 focus:ring-primary"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john.doe@example.com"
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
            className="bg-background border-border focus:border-primary focus:ring-1 focus:ring-primary"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a strong password"
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
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full cursor-pointer"
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
              <span>Creating Account...</span>
            </div>
          ) : (
            "Create Account"
          )}
        </Button>
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
