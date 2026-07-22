import { SupabaseLoginForm } from "@/components/supabase-login-form";

export const metadata = { title: "Login" };

export default function LoginPage() {
  return (
    <main className="container-x grid min-h-screen place-items-center py-20">
      <SupabaseLoginForm />
    </main>
  );
}
