import type { Metadata } from "next";
import { ContentShell } from "@/components/navigation/content-shell";

export const metadata: Metadata = { title: "Security", description: "Security and governance for Trionn workspaces." };
const controls = [
  ["01", "Workspace access", "Role-based access, invited domains and configurable review gates."],
  ["02", "Decision history", "Traceable changes with ownership, timestamps and linked product context."],
  ["03", "Data boundaries", "Configurable retention, exports and organization-level controls."],
  ["04", "Enterprise identity", "SAML, SSO and managed provisioning for scaled deployment."],
];
export default function SecurityPage() { return <ContentShell><main className="content-page"><header className="content-hero"><span>SECURITY / GOVERNANCE</span><h1>Move quickly<br /><em>without losing control.</em></h1><p>Security is part of the product operating model, not an overlay added at procurement.</p></header><section className="control-grid">{controls.map(([i,t,c])=><article key={t}><span>{i}</span><h2>{t}</h2><p>{c}</p></article>)}</section></main></ContentShell>; }
