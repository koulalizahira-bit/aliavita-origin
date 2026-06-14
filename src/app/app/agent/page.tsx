import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import AppShell from "@/components/AppShell";

// Espace équipe soignante / étudiants / nouveaux arrivants
export default async function AgentPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/");
  if (user.role !== "agent") redirect("/app/cadre");
  return <AppShell role="agent" />;
}
