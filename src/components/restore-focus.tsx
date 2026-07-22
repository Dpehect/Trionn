"use client";
import { useEffect,useRef } from "react";

export function RestoreFocus({active}:{active:boolean}) {
  const previous=useRef<HTMLElement|null>(null);
  useEffect(()=>{
    if(active) previous.current=document.activeElement as HTMLElement;
    else previous.current?.focus();
  },[active]);
  return null;
}
