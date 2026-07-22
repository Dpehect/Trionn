import { AdminNav } from "@/components/admin/admin-nav";
export default function AdminLayout({children}:{children:React.ReactNode}){return <div className="container-shell my-8 grid min-h-[75vh] border lg:grid-cols-[230px_1fr]"><AdminNav/><div className="min-w-0 p-5 md:p-8">{children}</div></div>}
