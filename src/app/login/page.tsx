import { redirect } from "next/navigation";

export default function LegacyLoginPage() {
  redirect("/merchant/login");
}
