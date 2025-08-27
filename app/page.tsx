"use client";
import NavigationHeader from "@/components/NavigationHeader";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const slider = scrollRef.current;
    if (!slider) return;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      slider.classList.add("cursor-grabbing");
      startX.current = e.pageX - slider.offsetLeft;
      scrollStart.current = slider.scrollLeft;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX.current) * 1.5;
      slider.scrollLeft = scrollStart.current - walk;
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      slider.classList.remove("cursor-grabbing");
    };

    const updateArrows = () => {
      setCanScrollLeft(slider.scrollLeft > 10);
      setCanScrollRight(
        slider.scrollLeft + slider.clientWidth < slider.scrollWidth - 10
      );
    };

    slider.addEventListener("mousedown", handleMouseDown);
    slider.addEventListener("mousemove", handleMouseMove);
    slider.addEventListener("mouseup", handleMouseUp);
    slider.addEventListener("mouseleave", handleMouseUp);
    slider.addEventListener("scroll", updateArrows);
    window.addEventListener("resize", updateArrows);

    // Run once on mount
    updateArrows();

    return () => {
      slider.removeEventListener("mousedown", handleMouseDown);
      slider.removeEventListener("mousemove", handleMouseMove);
      slider.removeEventListener("mouseup", handleMouseUp);
      slider.removeEventListener("mouseleave", handleMouseUp);
      slider.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, []);

  const scrollBy = (amount: number) => {
    scrollRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <>
      <NavigationHeader />
      <div className="flex justify-center mt-20 px-4">
        <div className="max-w-4xl flex flex-col items-center text-center">
          <p className="text-4xl font-semibold text-yellow-500 mb-6">
            Discover Your City.
          </p>
          <p className="text-white max-w-2xl mb-8 text-lg">
            Urbanary helps you explore the best venues, events, and hidden gems
            around your city. Start your journey and find your next favorite
            spot today!
          </p>
          <div className="flex space-x-4">
            <Link
              href="/signup"
              className="px-12 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition"
            >
              Sign Up
            </Link>
            <Link
              href="/login"
              className="px-12 py-2 bg-gray-200 text-gray-800 rounded-full shadow hover:bg-gray-300 transition"
            >
              Login
            </Link>
          </div>
        </div>
      </div>

      <div className="my-16 px-4 flex justify-center">
        <div className="w-full max-w-4xl">
          <h2 className="text-2xl font-semibold text-white mb-6 text-center">
            Featured Venues
          </h2>

          <div className="relative flex items-center">
            {/* Left button */}
            {canScrollLeft && (
              <button
                onClick={() => scrollBy(-300)}
                className="absolute left-0 bg-white/80 text-black rounded px-3 py-1 z-10 cursor-pointer"
              >
                ‹
              </button>
            )}

            <div
              ref={scrollRef}
              className="flex overflow-x-auto space-x-4 no-scrollbar cursor-grab select-none w-full"
            >
              <div className="min-w-[250px] bg-stone-800 text-white flex flex-col items-center rounded-xl p-4">
                <img src="59956.webp" alt="bar" className="w-[250px]" />
                <p className="text-2xl mt-2 font-bold text-left">Lorem Ipsum</p>
                <p className="text-sm font-light text-center mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
              <div className="min-w-[250px] bg-stone-800 text-white flex flex-col items-center rounded-xl p-4">
                <img src="59956.webp" alt="bar" className="w-[250px]" />
                <p className="text-2xl mt-2 font-bold text-left">Lorem Ipsum</p>
                <p className="text-sm font-light text-center mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
              <div className="min-w-[250px] bg-stone-800 text-white flex flex-col items-center rounded-xl p-4">
                <img src="59956.webp" alt="bar" className="w-[250px]" />
                <p className="text-2xl mt-2 font-bold text-left">Lorem Ipsum</p>
                <p className="text-sm font-light text-center mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
              <div className="min-w-[250px] bg-stone-800 text-white flex flex-col items-center rounded-xl p-4">
                <img src="59956.webp" alt="bar" className="w-[250px]" />
                <p className="text-2xl mt-2 font-bold text-left">Lorem Ipsum</p>
                <p className="text-sm font-light text-center mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
              <div className="min-w-[250px] bg-stone-800 text-white flex flex-col items-center rounded-xl p-4">
                <img src="59956.webp" alt="bar" className="w-[250px]" />
                <p className="text-2xl mt-2 font-bold text-left">Lorem Ipsum</p>
                <p className="text-sm font-light text-center mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
              <div className="min-w-[250px] bg-stone-800 text-white flex flex-col items-center rounded-xl p-4">
                <img src="59956.webp" alt="bar" className="w-[250px]" />
                <p className="text-2xl mt-2 font-bold text-left">Lorem Ipsum</p>
                <p className="text-sm font-light text-center mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
              <div className="min-w-[250px] bg-stone-800 text-white flex flex-col items-center rounded-xl p-4">
                <img src="59956.webp" alt="bar" className="w-[250px]" />
                <p className="text-2xl mt-2 font-bold text-left">Lorem Ipsum</p>
                <p className="text-sm font-light text-center mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
              <div className="min-w-[250px] bg-stone-800 text-white flex flex-col items-center rounded-xl p-4">
                <img src="59956.webp" alt="bar" className="w-[250px]" />
                <p className="text-2xl mt-2 font-bold text-left">Lorem Ipsum</p>
                <p className="text-sm font-light text-center mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>

            {/* Right button */}
            {canScrollRight && (
              <button
                onClick={() => scrollBy(300)}
                className="absolute right-0 bg-white/80 text-black rounded px-3 py-1 z-10 cursor-pointer"
              >
                ›
              </button>
            )}
          </div>
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
}
