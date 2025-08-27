import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ForgotPasswordForm from "./ForgotPasswordForm";

export default async function LoginPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (token) {
    redirect("/dashboard");
  }

  return <ForgotPasswordForm />;
}
