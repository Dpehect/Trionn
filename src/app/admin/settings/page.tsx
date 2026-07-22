export default function AdminSettingsPage() {
  return (
    <div>
      <p className="eyebrow">Configuration</p>
      <h1 className="display-lg mt-6">SETTINGS</h1>

      <div className="mt-10 grid gap-6 xl:grid-cols-2">
        {[
          ["Brand", "Logo, accent colors and public identity."],
          ["SEO", "Global title, description and social previews."],
          ["Integrations", "Supabase, analytics and email adapters."],
          ["Experience", "Sound, motion and WebGL defaults."],
        ].map(([title, body]) => (
          <article key={title} className="border hairline bg-[var(--surface-raised)] p-6">
            <p className="eyebrow">{title}</p>
            <p className="body-md mt-5 text-[var(--text-secondary)]">{body}</p>
            <button className="btn-secondary mt-8">Configure</button>
          </article>
        ))}
      </div>
    </div>
  );
}
