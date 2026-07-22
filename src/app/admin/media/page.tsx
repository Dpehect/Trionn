import { mediaRepository } from "@/server/media-repository";
import { MediaUploader } from "@/components/admin/media-uploader";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

export default async function AdminMediaPage() {
  const media = await mediaRepository.list();

  return (
    <div>
      <p className="eyebrow">Assets</p>
      <h1 className="display-lg mt-6">MEDIA LIBRARY</h1>

      <div className="mt-10 grid gap-8 xl:grid-cols-[.4fr_1fr]">
        <MediaUploader />

        <section>
          {media.length === 0 ? (
            <div className="grid min-h-72 place-items-center border hairline bg-[var(--surface-raised)] text-center">
              <div>
                <p className="eyebrow">No media</p>
                <p className="body-md mt-4 text-[var(--text-secondary)]">
                  Upload the first project asset.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {media.map((item: any) => {
                const url = supabaseAdmin
                  ? supabaseAdmin.storage.from("project-media").getPublicUrl(item.storage_path).data.publicUrl
                  : "";

                return (
                  <article key={item.id} className="overflow-hidden border hairline bg-[var(--surface-raised)]">
                    <div className="aspect-square bg-black/20">
                      {item.mime_type.startsWith("image/") ? (
                        <img src={url} alt={item.alt_text ?? ""} className="h-full w-full object-cover" />
                      ) : (
                        <video src={url} className="h-full w-full object-cover" muted />
                      )}
                    </div>
                    <div className="p-4">
                      <p className="text-sm">{item.alt_text}</p>
                      <p className="eyebrow mt-2">{item.mime_type}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
