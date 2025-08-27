import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({
    ok: true,
    message: "Logged out successfully",
  });

  res.cookies.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0,
    path: "/",
  });

  return res;
}
