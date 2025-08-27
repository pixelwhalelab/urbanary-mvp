"use client";

import { useState, useRef, useEffect, FormEvent, KeyboardEvent } from "react";
import { Power, Send, Globe, Phone, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface DashboardClientProps {
  name: string;
}

interface Venue {
  image: string;
  map: string;
  description: string;
  website: string;
  name: string;
  phone: string;
  address: string;
}

interface AIResponse {
  reply: string;
  venues: Venue[];
}

export default function DashboardClient({ name }: DashboardClientProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [dots, setDots] = useState(".");
  const [question, setQuestion] = useState<string | null>(null);
  const [isThinking, setIsThinking] = useState(false);
  const [reply, setReply] = useState<string | null>(null);
  const [venues, setVenues] = useState<Venue[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    setLoading(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/login");
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 4 * 24) + "px";
      setExpanded(textareaRef.current.scrollHeight > 24);
    }
  }, [value]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;

    setQuestion(value);
    setValue("");
    setIsThinking(true);
    setReply(null);
    setVenues([]);

    try {
      const res = await fetch("/api/auth/urbanary-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: `${name} Asks, ${value}` }),
      });

      if (!res.ok) throw new Error("Failed to fetch");

      const data: AIResponse = await res.json();

      setReply(data.reply);
      setVenues(data.venues || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsThinking(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as FormEvent);
    }
  };

  return (
    <>
      {/* Header */}
      <div className="p-4 border-b border-[#141414] bg-[#0f0e0e]">
        <div className="body-container flex space-x-4">
          <div className="w-1/2 md:w-1/3 flex items-center">
            <Link href="/dashboard" className="inline-block">
              <img
                src="/logo.webp"
                alt="Urbanary Logo"
                className="w-48 h-auto cursor-pointer"
              />
            </Link>
          </div>
          <div className="w-1/2 md:w-2/3 flex items-center mx-auto">
            <div className="flex justify-end items-center w-full">
              <div className="flex space-x-6">
                <button
                  className="text-white py-2 px-4 rounded bg-blue-600 cursor-pointer"
                  onClick={handleLogout}
                  disabled={loading}
                >
                  <Power />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI part */}
      <div className="mt-14 mx-3 md:mx-9 flex flex-col items-center">
        <p className="text-center text-3xl font-sans text-yellow-500 max-w-2xl">
          Welcome, {name}
        </p>
        <p className="text-center text-lg mt-1 text-neutral-400 max-w-2xl">
          Discover your city with Urbanary.
        </p>

        {/* Textarea Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl relative border-2 border-neutral-700 shadow-sm bg-[#141414] text-white mt-5 transition-all rounded-2xl"
        >
          <textarea
            ref={textareaRef}
            rows={1}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Discover your city..."
            className="w-full resize-none outline-none bg-transparent text-base px-5 py-3 pr-16 transition-all scrollbar-none"
            style={{
              lineHeight: "24px",
              maxHeight: 4 * 24 + "px",
              overflowY: "auto",
            }}
          />

          <button
            type="submit"
            disabled={!value.trim()}
            className="absolute cursor-pointer bottom-2 right-2 p-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>

        {/* User Question */}
        {question && (
          <div className="space-y-2 mt-5 mx-3 w-full max-w-2xl pl-3 border-l-4 border-l-blue-600">
            <p className="bg-gray-700 text-white p-2 rounded inline-block">
              {name} :
            </p>
            <p>{question}</p>
          </div>
        )}

        {/* Skeleton */}
        {isThinking && (
          <div className="space-y-2 mt-5 mx-3 w-full max-w-2xl pl-3 border-l-4 border-l-blue-600">
            <p className="text-gray-200 animate-pulse">Thinking{dots}</p>
            <div className="h-4 bg-gray-700 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-700 rounded w-5/6 animate-pulse"></div>
            <div className="h-4 bg-gray-700 rounded w-2/3 animate-pulse"></div>
          </div>
        )}

        {/* Reply */}
        {reply && (
          <div className="space-y-2 mt-5 mx-3 w-full max-w-2xl pl-3 mb-10 border-l-4 border-l-blue-600 flex flex-col">
            <p className="bg-yellow-600 text-white p-2 rounded w-fit self-start">
              Urbanary :
            </p>

            <div
              className="text-gray-200 prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: reply || "" }}
            />

            {venues.length > 0 &&
              venues.map((venue, idx) => (
                <div key={idx} className="flex w-full gap-x-6 mt-5">
                  <div className="w-1/3 flex items-start justify-center">
                    <img
                      src={venue.image || "/fallback.jpg"}
                      alt={venue.name || "Venue"}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  </div>
                  <div className="w-2/3 flex flex-col justify-center space-y-2">
                    {venue.name && (
                      <p className="text-lg font-semibold text-white">
                        {venue.name}
                      </p>
                    )}
                    {venue.description && (
                      <p className="text-sm text-gray-400">
                        {venue.description}
                      </p>
                    )}
                    {venue.address && (
                      <div className="text-sm text-gray-400 flex items-center">
                        <div className="bg-yellow-600 text-black px-3 py-1 rounded mr-2 flex-none whitespace-nowrap">
                          Address
                        </div>
                        <div className="flex-1 break-words">
                          {venue.address}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-3 mt-2">
                      {venue.website && (
                        <a
                          href={
                            venue.website.startsWith("http")
                              ? venue.website
                              : "https://" + venue.website
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm inline-flex items-center"
                        >
                          <Globe /> 
                        </a>
                      )}

                      {venue.phone && (
                        <a
                          href={`tel:${venue.phone}`}
                          className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm inline-flex items-center"
                        >
                          <Phone />
                        </a>
                      )}

                      {venue.map && (
                        <a
                          href={venue.map}
                          target="_blank"
                          className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm inline-flex items-center"
                        >
                          <MapPin />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
}
