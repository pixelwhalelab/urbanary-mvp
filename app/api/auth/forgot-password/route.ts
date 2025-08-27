import { NextResponse } from "next/server";
import crypto from "crypto";
import db from "@/lib/mongoose";
import User from "@/models/User";

const RESET_TOKEN_TTL = 60 * 60 * 1000; // 1 hour

export async function POST(req: Request) {
  try {
    await db;
    const { email } = await req.json();
    console.log("Received reset request for:", email);

    const user = await User.findOne({ email });
    if (!user) {
      console.log("No user found. Returning ok:true anyway.");
      return NextResponse.json({
        ok: true,
        message: "If the email exists, a reset link has been sent.",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenHash = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = resetTokenHash;
    user.resetPasswordExpiresAt = new Date(Date.now() + RESET_TOKEN_TTL);

    await user.save();
    console.log("Reset token saved in DB for:", email);

    const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;
    console.log("Reset link:", resetLink);

    const mailRes = await fetch("https://send.api.mailtrap.io/api/send", {
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
        subject: "Reset your password",
        html: `<p>Hello ${user.name},</p>
               <p>Click <a href="${resetLink}">here</a> to reset your password. 
               This link expires in 1 hour.</p>`,
      }),
    });

    console.log("Mailtrap response status:", mailRes.status);

    return NextResponse.json({
      ok: true,
      message: "If the email exists, a reset link has been sent.",
    });
  } catch (err) {
    console.error("Forgot password error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
