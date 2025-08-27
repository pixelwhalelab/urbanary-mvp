"use client";
import NavigationHeader from "@/components/NavigationHeader";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";

const Page = () => {
  return (
    <>
      <NavigationHeader />
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-5">
        <div className="min-w-[250px] bg-stone-800 text-white flex flex-col items-start rounded-xl p-4">
          <img src="6494599.jpg" alt="bar" className="w-full rounded-lg" />
          <p className="text-2xl mt-2 font-bold text-left">Lorem Ipsum</p>
          <p className="text-sm font-light mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        <div className="min-w-[250px] bg-stone-800 text-white flex flex-col items-start rounded-xl p-4">
          <img src="6494599.jpg" alt="bar" className="w-full rounded-lg" />
          <p className="text-2xl mt-2 font-bold text-left">Dolor Sit</p>
          <p className="text-sm font-light mt-2">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>

        <div className="min-w-[250px] bg-stone-800 text-white flex flex-col items-start rounded-xl p-4">
          <img src="6494599.jpg" alt="bar" className="w-full rounded-lg" />
          <p className="text-2xl mt-2 font-bold text-left">Consectetur</p>
          <p className="text-sm font-light mt-2">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur.
          </p>
        </div>

        <div className="min-w-[250px] bg-stone-800 text-white flex flex-col items-start rounded-xl p-4">
          <img src="6494599.jpg" alt="bar" className="w-full rounded-lg" />
          <p className="text-2xl mt-2 font-bold text-left">Adipiscing</p>
          <p className="text-sm font-light mt-2">
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </p>
        </div>

        <div className="min-w-[250px] bg-stone-800 text-white flex flex-col items-start rounded-xl p-4">
          <img src="6494599.jpg" alt="bar" className="w-full rounded-lg" />
          <p className="text-2xl mt-2 font-bold text-left">Elit Sed</p>
          <p className="text-sm font-light mt-2">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium.
          </p>
        </div>

        <div className="min-w-[250px] bg-stone-800 text-white flex flex-col items-start rounded-xl p-4">
          <img src="6494599.jpg" alt="bar" className="w-full rounded-lg" />
          <p className="text-2xl mt-2 font-bold text-left">Incididunt</p>
          <p className="text-sm font-light mt-2">
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
            fugit.
          </p>
        </div>
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