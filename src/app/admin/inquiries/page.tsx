import { inquiryRepository } from "@/server/inquiry-repository";
import { InquiryStatusControl } from "@/components/inquiry-status-control";

export const dynamic = "force-dynamic";

export default async function AdminInquiriesPage() {
  const inquiries = await inquiryRepository.list();

  return (
    <div>
      <p className="eyebrow">CRM</p>
      <h1 className="display-lg mt-6">INQUIRIES</h1>

      <div className="mt-10 overflow-x-auto border hairline">
        <table className="w-full min-w-[980px] border-collapse">
          <thead>
            <tr className="border-b hairline text-left">
              {["Name", "Company", "Budget", "Email", "Created", "Status"].map((label) => (
                <th key={label} className="p-4 text-xs uppercase tracking-[.14em] text-[var(--text-secondary)]">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {inquiries.map((item) => (
              <tr key={item.id} className="border-b hairline">
                <td className="p-4 font-medium">{item.name}</td>
                <td className="p-4 text-[var(--text-secondary)]">{item.company}</td>
                <td className="p-4">{item.budget}</td>
                <td className="p-4 text-[var(--text-secondary)]">{item.email}</td>
                <td className="p-4 text-sm text-[var(--text-secondary)]">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>
                <td className="p-4">
                  <InquiryStatusControl id={item.id} current={item.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
