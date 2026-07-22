"use client";
import { useEffect,useState } from "react";

export function IdleMount({children,fallback=null}:{children:React.ReactNode;fallback?:React.ReactNode}) {
  const [ready,setReady]=useState(false);
  useEffect(()=>{
    const run=()=>setReady(true);
    if("requestIdleCallback" in window){
      const id=(window as any).requestIdleCallback(run,{timeout:1200});
      return()=> (window as any).cancelIdleCallback(id);
    }
    const id=window.setTimeout(run,300);
    return()=>window.clearTimeout(id);
  },[]);
  return ready ? children : fallback;
}
