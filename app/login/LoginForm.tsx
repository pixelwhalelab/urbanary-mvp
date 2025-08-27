"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlignJustify, X, SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import NavigationHeader from "@/components/NavigationHeaderSpecial";
export default function LoginForm() {
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setServerMessage("");
    setLoading(true);

    let newErrors: typeof errors = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setServerMessage(data.error || "Something went wrong");
      } else {
        setServerMessage(data.message);
        router.push("/dashboard");
      }
    } catch (err) {
      console.error(err);
      setServerMessage("Network error, try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = () => {
    router.push(
      `/resend-verification-email?email=${encodeURIComponent(email)}`
    );
  };

  return (
    <div>
      {/* Navbar */}
      <NavigationHeader/>

      {/* Login Form */}
      <div className="items-center md:mx-auto bg-white text-black p-4 rounded max-w-[400px] m-5 sm:mx-4">
        <p className="text-black text-xl font-semibold">Login</p>
        <p className="mt-2 text-sm">
          Please enter your registered email and password to securely log in.
        </p>
        <hr className="my-4" />

        <form onSubmit={handleSubmit} className="space-y-4">
          {serverMessage && (
            <p className="text-sm font-medium bg-black px-5 py-2 rounded text-white">
              {serverMessage}
            </p>
          )}

          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-xl 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-white px-5 py-2 bg-red-700 rounded text-sm mt-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-xl 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-white px-5 py-2 bg-red-700 rounded text-sm mt-1">
                {errors.password}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex items-center space-x-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 cursor-pointer text-white py-2 px-4 rounded 
                         hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {serverMessage === "Please verify your email first" && (
              <button
                type="button"
                onClick={handleResendVerification}
                className="bg-yellow-500 cursor-pointer text-black py-2 px-4 rounded 
                           hover:bg-yellow-600 transition"
              >
                Resend Verification Email
              </button>
            )}
          </div>
        </form>
        <p className="text-sm text-black mt-2">
          Want to be a member?{" "}
          <Link href="/signup" className="text-blue-600 hover:underline">
            Signup
          </Link>
        </p>
        <p className="text-sm text-black">
          Forgot your password?{" "}
          <Link href="/forgot-password" className="text-blue-600 hover:underline">
            Reset Password
          </Link>
        </p>
      </div>
    </div>
  );
}
