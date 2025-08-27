"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  AlignJustify,
  X,
  SquareArrowOutUpRight,
} from "lucide-react";
import Link from "next/link";
import NavigationHeader from "@/components/NavigationHeaderSpecial";
const Page = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState<{ email?: string; otp?: string }>({});
  const [serverMessage, setServerMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const validate = () => {
    const newErrors: { email?: string; otp?: string } = {};

    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!otp) {
      newErrors.otp = "OTP is required.";
    } else if (!/^\d{6}$/.test(otp)) {
      newErrors.otp = "OTP must be a 6-digit number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerMessage("");

    if (!validate()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();
      if (res.ok) {
        setServerMessage(data.message);
        setTimeout(() => router.push("/login"), 1000);
      } else {
        setServerMessage(data.error || "Verification failed");
      }
    } catch (err) {
      setServerMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Navbar */}
      <NavigationHeader/>

      {/* Verify Form */}
      <div className="items-center md:mx-auto bg-white text-black p-4 rounded max-w-[400px] m-5 sm:mx-4">
        <p className="text-black text-xl font-semibold">Verify Email</p>
        <p className="mt-2 text-sm">
          We’ve sent a One-Time Password (OTP) to your email address. Please
          enter your email and the OTP below to verify your account. If you
          don’t see the email in your inbox, be sure to check your spam or junk
          folder.
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

          {/* OTP Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Your 6-Digit OTP
            </label>
            <input
              name="otp"
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-xl 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.otp && (
              <p className="text-white px-5 py-2 bg-red-700 rounded text-sm mt-1">
                {errors.otp}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-auto bg-blue-600 cursor-pointer text-white py-2 px-4 rounded 
                       hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Complete Signup"}
          </button>
        </form>
        <p className="text-sm text-black mt-2">
          Already verified ?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Page;
