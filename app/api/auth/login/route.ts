import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "@/lib/mongoose";
import User from "@/models/User";

export async function POST(req: Request) {
  await db;
  const { email, password } = await req.json();

  const user = await User.findOne({ email });
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  if (!user.verified)
    return NextResponse.json(
      { error: "Please verify your email first" },
      { status: 400 }
    );

  const ok = await bcrypt.compare(password, user.password);
  if (!ok)
    return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });

  const token = jwt.sign(
    { sub: user._id, email: user.email, name: user.name },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "7d",
    }
  );

  const res = NextResponse.json({
    ok: true,
    message: "Logged in successfully",
  });
  res.cookies.set("token", token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 });
  return res;
}
