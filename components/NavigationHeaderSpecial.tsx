"use client";
import { useRef, useEffect, useState } from "react";
import {
  ArrowRight,
  AlignJustify,
  X,
  SquareArrowOutUpRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const NavigationHeader = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/login");
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  return (
    <>
      <div className="p-4 border-b-3 border-[#141414] bg-[#0f0e0e]">
        <div className="body-container flex space-x-4">
          <div className="w-1/2 md:w-1/3 flex items-center">
            <Link href="/" className="inline-block">
              <img
                src="/logo.webp"
                alt="Urbanary Logo"
                className="w-48 h-auto cursor-pointer"
              />
            </Link>
          </div>
          <div className="w-1/2 md:w-2/3 flex items-center mx-auto">
            <div className="flex justify-end items-center w-full">
              <div className="hidden md:flex space-x-6">
                <Link href="/" className="inline-block">
                  <span className="hover:text-blue-600 cursor-pointer">
                    Home
                  </span>
                </Link>
                <Link href="/featured-venues" className="inline-block">
                  <span className="hover:text-blue-600 cursor-pointer">
                    Featured Venues
                  </span>
                </Link>
                <Link href="/partnerships" className="inline-block">
                  <span className="hover:text-blue-600 cursor-pointer">
                    Partnerships
                  </span>
                </Link>
                <Link href="/seasonal-leeds" className="inline-block">
                  <span className="hover:text-blue-600 cursor-pointer">
                    Seasonal Leeds
                  </span>
                </Link>
                <Link href="/support" className="inline-block">
                  <span className="hover:text-blue-600 cursor-pointer">
                    Support
                  </span>
                </Link>
              </div>
              <button
                onClick={toggleMenu}
                className="bg-blue-600 cursor-pointer p-2 rounded ml-4 flex md:hidden items-center text-white"
              >
                {isMenuOpen ? (
                  <X className="transform rotate-180" />
                ) : (
                  <AlignJustify className="transform rotate-0" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute inset-x-2 z-10 bg-yellow-600 p-4 rounded md:hidden text-black text-xl">
          <ul className="space-y-3 divide-y divide-black">
            <li>
              <Link
                href="/"
                className="py-0.5 flex items-center cursor-pointer hover:text-blue-600"
              >
                Home <SquareArrowOutUpRight className="w-4 h-4 ml-2" />
              </Link>
            </li>
            <li>
              <Link
                href="/featured-venues"
                className="py-0.5 flex items-center cursor-pointer hover:text-blue-600"
              >
                Featured Venues{" "}
                <SquareArrowOutUpRight className="w-4 h-4 ml-2" />
              </Link>
            </li>
            <li>
              <Link
                href="/partnerships"
                className="py-0.5 flex items-center cursor-pointer hover:text-blue-600"
              >
                Partnerships <SquareArrowOutUpRight className="w-4 h-4 ml-2" />
              </Link>
            </li>
            <li>
              <Link
                href="/seasonal-leeds"
                className="py-0.5 flex items-center cursor-pointer hover:text-blue-600"
              >
                Seasonal Leeds{" "}
                <SquareArrowOutUpRight className="w-4 h-4 ml-2" />
              </Link>
            </li>
            <li>
              <Link
                href="/support"
                className="py-0.5 flex items-center cursor-pointer hover:text-blue-600"
              >
                Support <SquareArrowOutUpRight className="w-4 h-4 ml-2" />
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default NavigationHeader;
