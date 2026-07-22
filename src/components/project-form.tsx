"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema, type ProjectInput } from "@/lib/project-schema";
import { toast, Toaster } from "sonner";

export function ProjectForm(){
 const {register,handleSubmit,formState:{errors,isSubmitting},reset}=useForm<ProjectInput>({resolver:zodResolver(projectSchema)});
 const onSubmit=async(data:ProjectInput)=>{
  const res=await fetch("/api/inquiries",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)});
  if(!res.ok){toast.error("Please check the form.");return}
  toast.success("Project request received.");reset();
 };
 const field="w-full border-b hairline bg-transparent py-4 outline-none placeholder:text-[var(--muted)]";
 return <><Toaster theme="dark"/><form onSubmit={handleSubmit(onSubmit)} className="grid gap-5 max-w-3xl">
  <input className={field} placeholder="Your name" {...register("name")}/>{errors.name&&<small>{errors.name.message}</small>}
  <input className={field} placeholder="Email" {...register("email")}/><input className={field} placeholder="Company" {...register("company")}/>
  <select className={field} defaultValue="" {...register("budget")}><option value="" disabled>Budget</option><option value="10-25k">10–25k</option><option value="25-50k">25–50k</option><option value="50-100k">50–100k</option><option value="100k+">100k+</option></select>
  <textarea className={field+" min-h-36"} placeholder="Tell us about the challenge" {...register("message")}/>
  <button disabled={isSubmitting} className="mt-5 justify-self-start rounded-full bg-[var(--acid)] px-8 py-4 text-xs uppercase tracking-[.16em] text-black disabled:opacity-50">{isSubmitting?"Sending…":"Send project brief"}</button>
 </form></>;
}
