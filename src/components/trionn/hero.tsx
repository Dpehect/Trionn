"use client";
import { useEffect, useRef } from "react";

export function Hero(){
 const orb=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const move=(e:PointerEvent)=>{
   if(!orb.current)return;
   const x=(e.clientX/window.innerWidth-.5)*28;
   const y=(e.clientY/window.innerHeight-.5)*28;
   orb.current.style.transform=`translate3d(${x}px,${y}px,0) rotate(${x*.15}deg)`;
  };
  window.addEventListener("pointermove",move,{passive:true});
  return()=>window.removeEventListener("pointermove",move);
 },[]);
 return <section className="trionn-hero">
   <div className="hero-grid"/>
   <div className="hero-orb" ref={orb}><div className="orb-core"/><div className="orb-ring ring-a"/><div className="orb-ring ring-b"/></div>
   <div className="hero-kicker"><span>Independent studio</span><span>Est. MMXXIV</span></div>
   <h1><span>WE BUILD</span><span className="hero-outline">DIGITAL</span><span>GRAVITY.</span></h1>
   <div className="hero-bottom"><p>Strategy, design and creative development for brands that refuse to disappear into the feed.</p><a href="#selected">ENTER THE FIELD ↘</a></div>
 </section>;
}
