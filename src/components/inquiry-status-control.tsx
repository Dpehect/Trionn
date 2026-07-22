"use client";

import { useState } from "react";
import { toast } from "sonner";

export function InquiryStatusControl({
  id,
  current,
}: {
  id: string;
  current: "new" | "reviewing" | "closed";
}) {
  const [status, setStatus] = useState(current);
  const [loading, setLoading] = useState(false);

  async function update(next: typeof status) {
    setLoading(true);
    const response = await fetch(`/api/inquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    setLoading(false);

    if (!response.ok) {
      toast.error("Status could not be updated.");
      return;
    }

    setStatus(next);
    toast.success("Inquiry updated.");
  }

  return (
    <select
      disabled={loading}
      value={status}
      onChange={(event) => update(event.target.value as typeof status)}
      className="border hairline bg-[var(--bg)] px-3 py-2 text-xs uppercase tracking-[.12em]"
    >
      <option value="new">New</option>
      <option value="reviewing">Reviewing</option>
      <option value="closed">Closed</option>
    </select>
  );
}
