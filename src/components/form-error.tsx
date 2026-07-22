export function FormError({id,message}:{id:string;message?:string}) {
  if(!message) return null;
  return <p id={id} role="alert" className="mt-2 text-sm text-[var(--status-error)]">{message}</p>;
}
