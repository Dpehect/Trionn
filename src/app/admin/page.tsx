import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { inquiryRepository } from "@/server/inquiry-repository";
import { SiteHeader } from "@/components/site-header";
import { InquiryStatusControl } from "@/components/inquiry-status-control";
import { Toaster } from "sonner";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") redirect("/login");

  const inquiries = await inquiryRepository.list();

  return (
    <main>
      <SiteHeader />
      <Toaster theme="dark" />
      <section className="container-x min-h-screen pb-24 pt-36">
        <p className="eyebrow">Administration</p>
        <h1 className="mt-8 text-6xl tracking-[-.07em] md:text-9xl">INQUIRY CMS</h1>

        <div className="mt-16 overflow-x-auto border hairline">
          <table className="w-full min-w-[900px] border-collapse">
            <thead>
              <tr className="border-b hairline text-left">
                {["Name", "Company", "Budget", "Email", "Created", "Status"].map((label) => (
                  <th key={label} className="p-4 text-xs uppercase tracking-[.14em] text-[var(--muted)]">{label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {inquiries.map((item) => (
                <tr key={item.id} className="border-b hairline">
                  <td className="p-4 font-medium">{item.name}</td>
                  <td className="p-4 text-[var(--muted)]">{item.company}</td>
                  <td className="p-4">{item.budget}</td>
                  <td className="p-4 text-[var(--muted)]">{item.email}</td>
                  <td className="p-4 text-sm text-[var(--muted)]">{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td className="p-4"><InquiryStatusControl id={item.id} current={item.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
