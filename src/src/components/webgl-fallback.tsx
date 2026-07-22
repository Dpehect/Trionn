export function WebGLFallback() {
  return (
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#d8ff61_0%,#1b1b18_35%,#090909_72%)]">
      <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 blur-sm" />
    </div>
  );
}
