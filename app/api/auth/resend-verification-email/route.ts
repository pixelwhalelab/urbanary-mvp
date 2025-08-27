import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import db from "@/lib/mongoose";
import User from "@/models/User";

const OTP_TTL = 10 * 60 * 1000; // 10 minutes

export async function POST(req: Request) {
  try {
    await db;
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "No account found with this email" },
        { status: 404 }
      );
    }

    if (user.verified) {
      return NextResponse.json(
        { error: "Account is already verified" },
        { status: 400 }
      );
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpHash = await bcrypt.hash(otp, 10);
    const otpExpiresAt = new Date(Date.now() + OTP_TTL);

    user.otpHash = otpHash;
    user.otpExpiresAt = otpExpiresAt;
    await user.save();

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
        subject: "Email Verification OTP",
        html: `<p>Hello ${user.name},</p>
               <p>Your OTP is <b>${otp}</b>. It expires in 10 minutes.</p>`,
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
      message:
        "Verification email resent. Check your inbox or spam/junk folder.",
    });
  } catch (err) {
    console.error("Resend verification email error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
