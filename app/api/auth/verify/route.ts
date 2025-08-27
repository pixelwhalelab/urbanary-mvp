import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import db from "@/lib/mongoose";
import User from "@/models/User";

export async function POST(req: Request) {
  await db;
  const { email, otp } = await req.json();

  const user = await User.findOne({ email });
  if (!user || !user.otpHash || !user.otpExpiresAt) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (new Date() > new Date(user.otpExpiresAt)) {
    return NextResponse.json({ error: "OTP expired" }, { status: 400 });
  }

  const ok = await bcrypt.compare(otp, user.otpHash);
  if (!ok) {
    return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
  }

  user.verified = true;
  user.otpHash = undefined;
  user.otpExpiresAt = undefined;
  await user.save();

  return NextResponse.json({ ok: true, message: "Email verified" });
}
