import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <main className="container-x grid min-h-screen place-items-center text-center">
      <div>
        <p className="eyebrow">Access denied</p>
        <h1 className="display-xl mt-6">NO ACCESS</h1>
        <p className="body-lg text-muted mt-8">
          Your role does not allow this action.
        </p>
        <Link href="/" className="btn-primary mt-10">
          Return home
        </Link>
      </div>
    </main>
  );
}
