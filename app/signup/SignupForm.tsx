"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlignJustify, X, SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import NavigationHeader from "@/components/NavigationHeaderSpecial";
const SignupForm = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    dob: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [serverMessage, setServerMessage] = useState("");

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

    if (!form.name.trim()) newErrors.name = "Full Name is required";
    if (!emailRegex.test(form.email))
      newErrors.email = "Enter a valid email address";
    if (!passwordRegex.test(form.password))
      newErrors.password =
        "Password must be at least 8 characters and contain both letters and numbers";
    if (!form.dob) {
      newErrors.dob = "Date of Birth is required";
    } else {
      const dobDate = new Date(form.dob);
      const today = new Date();
      const age =
        today.getFullYear() -
        dobDate.getFullYear() -
        (today <
        new Date(today.getFullYear(), dobDate.getMonth(), dobDate.getDate())
          ? 1
          : 0);

      if (age < 18) {
        newErrors.dob = "You must be at least 18 years old to sign up";
      }
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerMessage("");

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        setServerMessage(data.message);

        setTimeout(() => {
          router.push("/verify-email");
        }, 1000);
      } else {
        setServerMessage(data.error || "Something went wrong.");
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
      {/* Signup form */}
      <div className="items-center md:mx-auto bg-white text-black p-4 rounded max-w-[400px] m-5 sm:mx-4">
        <p className="text-black text-xl font-semibold">Signup</p>
        <p className="mt-2 text-sm">
          To get started, enter your email address, password, and date of birth
          to create your account. We’ll then send a One-Time Password (OTP) to
          your email. Simply enter the OTP to verify your email and finish
          setting up your account. If you don’t see the email in your inbox,
          please check your spam or junk folder.
        </p>
        <hr className="my-4" />

        <form onSubmit={handleSubmit} className="space-y-4">
          {serverMessage && (
            <p className="text-sm font-medium bg-black px-5 py-2 rounded text-white">
              {serverMessage}
            </p>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && (
              <p className="text-white px-5 py-2 bg-red-700 rounded text-sm mt-1">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-white px-5 py-2 bg-red-700 rounded text-sm mt-1">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-white px-5 py-2 bg-red-700 rounded text-sm mt-1">
                {errors.password}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <input
              name="dob"
              type="date"
              value={form.dob}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.dob && (
              <p className="text-white px-5 py-2 bg-red-700 rounded text-sm mt-1">
                {errors.dob}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-auto bg-blue-600 cursor-pointer text-white py-2 px-4 rounded hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <p className="text-sm text-black mt-2">
          Already a member?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
