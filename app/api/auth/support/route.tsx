import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const response = await fetch("https://send.api.mailtrap.io/api/send", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.MAILTRAP_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: {
          email: "hello@urbanary.co.uk",
          name: "Urbanary Support",
        },
        to: [
          {
            email: "support@urbanary.co.uk",
          },
        ],
        subject: "New Support Message",
        text: `Name: ${name}\nEmail: (${email})\nMessage: ${message}`,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Mailtrap API error:", errorData);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
