import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import AppShell from "@/components/AppShell";

export default async function TuteurPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/");
  if (user.role !== "tuteur") redirect("/app/agent");
  return <AppShell role="tuteur" />;
}
