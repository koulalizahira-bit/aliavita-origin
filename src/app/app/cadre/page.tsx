import { redirect } from "next/navigation";

// Route dépréciée — redirige vers le nouvel espace tuteur
export default function CadrePage() {
  redirect("/app/tuteur");
}
