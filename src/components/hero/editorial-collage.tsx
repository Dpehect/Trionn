"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Bot, Code2, Layers3, Smartphone } from "lucide-react";
import { useRef } from "react";

type CardConfig = { label:string; eyebrow:string; index:number; className:string; icon:typeof Code2; scene:"code"|"ai"|"product"|"mobile" };
const cards:CardConfig[]=[
{label:"Software",eyebrow:"Systems",index:0,className:"collage-card--blue",icon:Code2,scene:"code"},
{label:"AI Systems",eyebrow:"Automation",index:3,className:"collage-card--violet",icon:Bot,scene:"ai"},
{label:"Products",eyebrow:"SaaS",index:4,className:"collage-card--coral",icon:Layers3,scene:"product"},
{label:"Mobile",eyebrow:"Apps",index:2,className:"collage-card--lime",icon:Smartphone,scene:"mobile"},
];
function openCapability(index:number){window.dispatchEvent(new CustomEvent("softbridge:select-service",{detail:{index}}));document.querySelector("#services")?.scrollIntoView({behavior:"smooth",block:"start"});}
function MiniScene({type}:{type:CardConfig["scene"]}){
if(type==="code")return <div className="mini-scene mini-scene--code" aria-hidden><div className="mini-window-bar"><i/><i/><i/></div><div className="mini-code-row"><span>01</span><b>const</b><em> product</em><small>= build();</small></div><div className="mini-code-row"><span>02</span><b>ship</b><em>(quality)</em></div><div className="mini-code-row"><span>03</span><b>scale</b><em>(confidently)</em></div><div className="mini-code-cursor"/></div>;
if(type==="ai")return <div className="mini-scene mini-scene--ai" aria-hidden><div className="ai-node ai-node--one">Input</div><div className="ai-node ai-node--two">Agent</div><div className="ai-node ai-node--three">Action</div><svg viewBox="0 0 300 150" preserveAspectRatio="none"><path d="M45 75 C100 20 145 125 205 60 S270 95 285 40"/></svg><div className="ai-pulse"/></div>;
if(type==="product")return <div className="mini-scene mini-scene--product" aria-hidden><div className="product-sidebar"><i/><i/><i/><i/></div><div className="product-content"><div className="product-chart"><span/><span/><span/><span/><span/></div><div className="product-metrics"><b>84%</b><small>activation</small></div></div></div>;
return <div className="mini-scene mini-scene--mobile" aria-hidden><div className="phone-shell phone-shell--back"><div/><div/><div/></div><div className="phone-shell phone-shell--front"><span>Today</span><b>12.4k</b><div className="phone-chart"/></div></div>;
}
function CollageCard({card,order}:{card:CardConfig;order:number}){const Icon=card.icon;return <motion.button type="button" drag dragElastic={.12} dragMomentum={false} whileHover={{scale:1.025,rotate:order%2?-1.4:1.4,zIndex:20}} whileTap={{scale:.985}} onClick={()=>openCapability(card.index)} className={`collage-card ${card.className} collage-card--${order+1}`} aria-label={`Explore ${card.label}`}><div className="collage-card__topline"><span><Icon size={15}/>{card.eyebrow}</span><ArrowUpRight size={16}/></div><MiniScene type={card.scene}/><div className="collage-card__footer"><strong>{card.label}</strong><span>Open capability</span></div></motion.button>}
export function EditorialCollage(){const root=useRef<HTMLDivElement>(null);const mx=useMotionValue(0),my=useMotionValue(0);const sx=useSpring(mx,{stiffness:90,damping:24}),sy=useSpring(my,{stiffness:90,damping:24});const rotateY=useTransform(sx,[-.5,.5],[-4,4]),rotateX=useTransform(sy,[-.5,.5],[4,-4]);return <motion.div ref={root} className="editorial-collage" style={{rotateX,rotateY,transformPerspective:1200}} onPointerMove={e=>{const b=root.current?.getBoundingClientRect();if(!b)return;mx.set((e.clientX-b.left)/b.width-.5);my.set((e.clientY-b.top)/b.height-.5)}} onPointerLeave={()=>{mx.set(0);my.set(0)}}><div className="collage-paper collage-paper--one"/><div className="collage-paper collage-paper--two"/><div className="collage-stamp">SB / 26</div><div className="collage-caption">Drag the modules.<br/>Explore the system.</div>{cards.map((card,index)=><CollageCard key={card.label} card={card} order={index}/>)}<div className="collage-tape collage-tape--one"/><div className="collage-tape collage-tape--two"/></motion.div>}
