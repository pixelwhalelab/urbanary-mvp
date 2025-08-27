import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import db from "@/lib/mongoose";
import User from "@/models/User";

const OTP_TTL = 10 * 60 * 1000; // 10 minutes

export async function POST(req: Request) {
  try {
    await db;
    const { name, email, dob, password } = await req.json();

    if (!name || !email || !dob || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }
    const exists = await User.findOne({ email });
    if (exists) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }
    const hash = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpHash = await bcrypt.hash(otp, 10);
    const otpExpiresAt = new Date(Date.now() + OTP_TTL);

    await User.create({
      name,
      email,
      dob,
      password: hash,
      otpHash,
      otpExpiresAt,
      verified: false,
    });

    const res = await fetch("https://send.api.mailtrap.io/api/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.MAILTRAP_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: {
          email: "hello@urbanary.co.uk",
          name: "Urbanary",
        },
        to: [{ email }],
        subject: "Complete your account signup with OTP",
        html: `<p>Your OTP is <b>${otp}</b>. It expires in 10 minutes.</p>`,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Mailtrap API error:", errText);
      return NextResponse.json(
        { error: "Failed to send OTP email" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: "Signup successful, check your email for OTP. If you didn't get email, Please check your spam/junk folder.",
    });
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
