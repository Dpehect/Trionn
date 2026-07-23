'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
const schema=z.object({name:z.string().min(2),email:z.string().email(),company:z.string().min(2),service:z.string().min(1),budget:z.string().min(1),message:z.string().min(20).max(2000)});
type Values=z.infer<typeof schema>;
export function ContactForm(){const [status,setStatus]=useState<'idle'|'sending'|'sent'|'error'>('idle');const {register,handleSubmit,formState:{errors},reset}=useForm<Values>({resolver:zodResolver(schema)});const submit=async(values:Values)=>{setStatus('sending');try{const r=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(values)});if(!r.ok)throw new Error();setStatus('sent');reset()}catch{setStatus('error')}};return <form className="contact-form" onSubmit={handleSubmit(submit)} noValidate>
 <label><span>Name</span><input {...register('name')} placeholder="Your name"/>{errors.name&&<small>Please enter your name.</small>}</label>
 <label><span>Work email</span><input {...register('email')} type="email" placeholder="you@company.com"/>{errors.email&&<small>Enter a valid email.</small>}</label>
 <label><span>Company</span><input {...register('company')} placeholder="Company or team"/></label>
 <label><span>What are you building?</span><select {...register('service')} defaultValue=""><option value="" disabled>Select a capability</option><option>Custom software</option><option>AI automation</option><option>SaaS product</option><option>Mobile application</option><option>Product design</option></select></label>
 <label><span>Indicative budget</span><select {...register('budget')} defaultValue=""><option value="" disabled>Select range</option><option>€15k–€35k</option><option>€35k–€75k</option><option>€75k–€150k</option><option>€150k+</option></select></label>
 <label className="contact-form__wide"><span>Project context</span><textarea {...register('message')} rows={5} placeholder="The problem, desired outcome and target timing..."/>{errors.message&&<small>Add at least 20 characters.</small>}</label>
 <button disabled={status==='sending'}>{status==='sending'?'Sending…':'Send project brief'} <span>↗</span></button>
 {status==='sent'&&<p className="form-status">Brief received. We will reply within two business days.</p>}{status==='error'&&<p className="form-status form-status--error">Something went wrong. Please try again.</p>}
 </form>}
