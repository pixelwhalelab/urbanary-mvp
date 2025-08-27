import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  let userName = "User";

  try {
    const decoded = jwt.verify(token!, process.env.JWT_SECRET!) as {
      sub: string;
      email: string;
      name: string;
    };
    userName = decoded.name || "User";
  } catch (err) {
    redirect("/login");
  }

  return <DashboardClient name={userName} />;
}
