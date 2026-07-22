"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import { toast } from "sonner";

export function MediaUploader() {
  const [loading, setLoading] = useState(false);

  async function submit(formData: FormData) {
    setLoading(true);

    const response = await fetch("/api/admin/media/upload", {
      method: "POST",
      body: formData,
    });

    setLoading(false);

    if (!response.ok) {
      toast.error("Media upload failed.");
      return;
    }

    toast.success("Media uploaded.");
    window.location.reload();
  }

  return (
    <form action={submit} className="grid gap-5 border hairline bg-[var(--surface-raised)] p-6">
      <div>
        <label className="eyebrow">File</label>
        <input
          type="file"
          name="file"
          required
          accept="image/jpeg,image/png,image/webp,image/avif,video/mp4,video/webm"
          className="mt-4 block w-full text-sm"
        />
      </div>
      <div>
        <label className="eyebrow">Alt text</label>
        <input
          name="altText"
          required
          className="mt-3 w-full border-b hairline bg-transparent py-4 outline-none"
        />
      </div>
      <input type="hidden" name="folder" value="projects" />
      <button disabled={loading} className="btn-primary justify-self-start">
        <Upload size={16} />
        {loading ? "Uploading…" : "Upload media"}
      </button>
    </form>
  );
}
