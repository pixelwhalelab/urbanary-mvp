"use client";
import NavigationHeader from "@/components/NavigationHeader";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";

const Page = () => {
  return (
    <>
      <NavigationHeader />

      <main className="flex flex-col items-center justify-start min-h-screen p-6">
        <section className="w-full max-w-4xl bg-white shadow-md rounded-2xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Privacy Policy</h1>
          <p className="text-sm text-gray-500 mb-6">
            Last updated: 27/08/2025
          </p>
          <p className="text-gray-700 mb-6">
            Urbanary values your privacy. This Privacy Policy explains how we
            collect, use, and protect your personal information in compliance
            with the UK General Data Protection Regulation (UK GDPR).
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">1. Data We Collect</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1 mb-6">
            <li>Name</li>
            <li>Email address</li>
            <li>Venue and preference information you choose to share</li>
            <li>Usage data from your interaction with our chatbot and website</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2. How We Use Your Data</h2>
          <p className="text-gray-700 mb-2">We use your data to:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-1 mb-6">
            <li>Provide personalized venue recommendations</li>
            <li>Communicate with you regarding your account</li>
            <li>Improve our services</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">3. Data Sharing</h2>
          <p className="text-gray-700 mb-6">
            We do not sell your personal data. We may share data with trusted
            service providers (e.g., payment processors, analytics tools) under
            GDPR-compliant agreements.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">4. Data Retention</h2>
          <p className="text-gray-700 mb-6">
            We retain your data only as long as necessary for the purposes
            described in this policy.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">5. Your Rights</h2>
          <p className="text-gray-700 mb-6">
            You have the right to access, correct, or request deletion of your
            data. Contact us at{" "}
            <a
              href="mailto:privacy@urbanary.co.uk"
              className="text-blue-600 underline hover:text-blue-800"
            >
              privacy@urbanary.co.uk
            </a>.
          </p>
        </section>
      </main>
    </>
  );
};

export default Page;
