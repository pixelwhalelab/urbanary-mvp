"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { AlignJustify, X, SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import NavigationHeader from "@/components/NavigationHeaderSpecial";
export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token") || "";
  const email = searchParams.get("email") || "";

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState("");
  const [errors, setErrors] = useState<{ password?: string; confirm?: string }>({});

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

    if (!newPassword) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(newPassword)) {
      newErrors.password =
        "Password must be at least 8 characters and contain both letters and numbers";
    }

    if (!confirmPassword) {
      newErrors.confirm = "Confirm password is required";
    } else if (newPassword !== confirmPassword) {
      newErrors.confirm = "Passwords do not match";
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setServerMessage("");
    setLoading(true);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, email, newPassword }),
      });

      const data = await res.json();
      if (!res.ok) {
        setServerMessage(data.message || "Something went wrong");
      } else {
        setServerMessage(data.message);
        setTimeout(() => router.push("/login"), 2000);
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

      {/* Reset Password Form */}
      <div className="items-center md:mx-auto bg-white text-black p-4 rounded max-w-[400px] m-5 sm:mx-4">
        <p className="text-black text-xl font-semibold">Reset Password</p>
        <p className="mt-2 text-sm">Enter your new password below.</p>
        <hr className="my-4" />

        <form onSubmit={handleSubmit} className="space-y-4">
          {serverMessage && (
            <p className="text-sm font-medium bg-black px-5 py-2 rounded text-white">
              {serverMessage}
            </p>
          )}

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-xl 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-white px-5 py-2 bg-red-700 rounded text-sm mt-1">
                {errors.password}
              </p>
            )}
          </div>

          {/* Confirm Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-xl 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.confirm && (
              <p className="text-white px-5 py-2 bg-red-700 rounded text-sm mt-1">
                {errors.confirm}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-auto bg-blue-600 cursor-pointer text-white py-2 px-4 rounded 
                       hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
