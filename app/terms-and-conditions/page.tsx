"use client";
import NavigationHeader from "@/components/NavigationHeader";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";

const Page = () => {
  return (
    <>
      <NavigationHeader />

      {/* Terms & Conditions Section */}
      <main className="flex flex-col items-center justify-start min-h-screen p-6">
        <section className="w-full max-w-4xl bg-white shadow-md rounded-2xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Terms & Conditions</h1>
          <p className="text-sm text-gray-500 mb-6">
            Last updated: 27/08/2025
          </p>

          <p className="text-gray-700 mb-6">
            Welcome to Urbanary. By accessing or using our website and services,
            you agree to comply with and be bound by these Terms and Conditions.
            Please read them carefully.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">1. Use of Services</h2>
          <p className="text-gray-700 mb-6">
            You agree to use our services only for lawful purposes and in a way
            that does not infringe upon the rights of others or restrict their
            use and enjoyment of the services.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2. Accounts</h2>
          <p className="text-gray-700 mb-6">
            When you create an account with us, you must provide accurate and
            complete information. You are responsible for safeguarding your
            account credentials and all activities under your account.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">3. Intellectual Property</h2>
          <p className="text-gray-700 mb-6">
            All content, trademarks, and intellectual property on Urbanary are
            owned by or licensed to us. You may not reproduce, distribute, or
            create derivative works without prior written permission.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">4. Limitation of Liability</h2>
          <p className="text-gray-700 mb-6">
            Urbanary will not be liable for any indirect, incidental, or
            consequential damages arising from your use of our services. Our
            liability is limited to the maximum extent permitted by law.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">5. Termination</h2>
          <p className="text-gray-700 mb-6">
            We reserve the right to suspend or terminate your account if you
            breach these Terms and Conditions or engage in activities that may
            harm the service or other users.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">6. Governing Law</h2>
          <p className="text-gray-700 mb-6">
            These Terms and Conditions are governed by and construed in
            accordance with the laws of the United Kingdom.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">7. Contact Us</h2>
          <p className="text-gray-700">
            If you have any questions about these Terms and Conditions, please
            contact us at{" "}
            <a
              href="mailto:terms@urbanary.co.uk"
              className="text-blue-600 underline hover:text-blue-800"
            >
              terms@urbanary.co.uk
            </a>.
          </p>
        </section>
      </main>
    </>
  );
};

export default Page;
