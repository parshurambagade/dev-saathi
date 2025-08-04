"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Registration</CardTitle>
        <CardDescription>
          Enter your details to create an account.
        </CardDescription>
      </CardHeader>
      <form className="space-y-4" onSubmit={handleRegistration}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your first name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              type="text"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your last name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          {error && (
            <div className="flex items-center space-x-2 text-red-500">
              <AlertCircle size={16} />
              <span className="text-sm">{error}</span>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button className="w-full cursor-pointer" type="submit" disabled={isLoading}>
            {isLoading ? "Registering..." : "Register"}
          </Button>
        </CardFooter>
      </form>
      <div className="text-center pb-4">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:text-blue-500 underline cursor-pointer"
          >
            Sign in here
          </Link>
        </p>
      </div>
    </Card>
  );
}
