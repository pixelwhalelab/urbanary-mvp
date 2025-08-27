"use client";

import { useState } from "react";
import { AlignJustify, X, SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import NavigationHeader from "@/components/NavigationHeaderSpecial";
export default function ForgotPasswordForm() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState("");
  const [errors, setErrors] = useState<{ email?: string }>({});

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setServerMessage("");
    setLoading(true);

    if (!email) {
      setErrors({ email: "Email is required" });
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) {
        setServerMessage(data.error || "Something went wrong");
      } else {
        setServerMessage(data.message);
        //router.push("/dashboard");
      }
    } catch (err) {
      console.error(err);
      setServerMessage("Network error, try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Navbar */}
      <NavigationHeader/>

      {/* Forgot Password Form */}
      <div className="items-center md:mx-auto bg-white text-black p-4 rounded max-w-[400px] m-5 sm:mx-4">
        <p className="text-black text-xl font-semibold">Forgot Password</p>
        <p className="mt-2 text-sm">
          Enter your registered email, and we’ll send you a reset link.
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

          <button
            type="submit"
            disabled={loading}
            className="w-auto bg-blue-600 cursor-pointer text-white py-2 px-4 rounded 
                       hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
}
