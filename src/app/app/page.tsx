import { redirect } from "next/navigation";
import { getCurrentUser, homePathForRole } from "@/lib/auth";

// /app redirige vers l'espace approprié selon le rôle
export default async function AppPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/");
  redirect(homePathForRole(user.role));
}
