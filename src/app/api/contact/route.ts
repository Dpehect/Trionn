import { NextResponse } from 'next/server';
import { z } from 'zod';
const schema=z.object({name:z.string().min(2),email:z.string().email(),company:z.string().min(2),service:z.string().min(1),budget:z.string().min(1),message:z.string().min(20).max(2000)});
export async function POST(request:Request){try{const data=schema.parse(await request.json());console.info('Project inquiry received',{...data,messageLength:data.message.length,message:undefined});return NextResponse.json({ok:true},{status:201})}catch{return NextResponse.json({ok:false,error:'Invalid request'},{status:400})}}
