"use client";
import NavigationHeader from "@/components/NavigationHeader";
import { useState } from "react";
import Link from "next/link";

const Page = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.name.trim()) newErrors.name = "Full name is required.";
    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!form.message.trim()) newErrors.message = "Message cannot be empty.";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSuccess("");

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/auth/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSuccess("Thank you! Your message has been sent successfully.");
        setForm({ name: "", email: "", message: "" });
      } else {
        setErrors({ form: "Something went wrong. Please try again." });
      }
    } catch (error) {
      setErrors({ form: "Server error. Please try again later." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <NavigationHeader />
      <div className="items-center md:mx-auto bg-white text-black p-6 rounded-xl max-w-[400px] m-5 sm:mx-4 shadow">
        <p className="text-black text-xl font-semibold">Support</p>
        <p className="mt-2 text-sm text-gray-600">
          Have a question or need help? Fill out the form below and we’ll get back to you as soon as possible.
        </p>
        <hr className="my-4" />

        <form onSubmit={handleSubmit} className="space-y-4">
          {success && (
            <p className="text-sm font-medium bg-black px-5 py-2 rounded text-white">{success}</p>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              type="text"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && (
              <p className="text-white px-5 py-2 bg-red-700 rounded text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              type="email"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-white px-5 py-2 bg-red-700 rounded text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={4}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.message && (
              <p className="text-white px-5 py-2 bg-red-700 rounded text-sm mt-1">{errors.message}</p>
            )}
          </div>

          {errors.form && (
            <p className="text-white px-5 py-2 bg-red-700 rounded text-sm mt-1">{errors.form}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 cursor-pointer text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
      <footer className="bg-[#141414] text-white py-6 mt-10">
        <div className="max-w-5xl mx-auto text-center px-4">
          <p className="text-sm">
            © 2025 Urbanary. All rights reserved. Powered by{" "}
            <a
              href="https://fiveriversdesigns.co.uk/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:underline"
            >
              Five Rivers Designs
            </a>
          </p>

          <div className="mt-3 flex justify-center space-x-6 text-sm">
            <a href="/privacy-policy" className="hover:underline">
              Privacy Policy
            </a>
            <a href="/terms-and-conditions" className="hover:underline">
              Terms &amp; Conditions
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Page;
