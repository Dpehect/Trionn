"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { useRef, useState } from "react";
import { HeroStage } from "@/components/hero/hero-stage";
import { CinematicLoader } from "@/components/loader/cinematic-loader";
import { SiteNavigation } from "@/components/navigation/site-navigation";
export function SiteShell(){const [loading,setLoading]=useState(true);const main=useRef<HTMLElement>(null);useGSAP(()=>{if(loading)return;gsap.timeline({defaults:{ease:"power4.out"}}).from("[data-reveal]",{y:18,opacity:0,duration:.9,stagger:.045}).from(".hero-stage",{opacity:0,scale:.94,duration:1.45,ease:"expo.out"},"-=.65")},{scope:main,dependencies:[loading]});return <>{loading&&<CinematicLoader onComplete={()=>setLoading(false)}/>}<main ref={main} className="site-shell hiro-home" aria-hidden={loading}><header className="topbar"><Link className="brand hiro-brand" href="/" data-reveal><span>CREATIVE DEVELOPER</span></Link><SiteNavigation/></header><section className="hero hiro-hero"><div className="hiro-heading" data-reveal><span>CREATIVE DEVELOPER</span><h1>YUNUS EMRE<br/>GÜRLEK</h1></div><HeroStage/><div className="hiro-meta" data-reveal><div><span>BASE</span><b>ADANA, TURKEY</b></div><div><span>FOCUS</span><b>CREATIVE DEVELOPMENT / MOTION /<br/>3D MODELING</b></div><div><span>INDEX</span><b>PORTFOLIO 2026</b></div></div></section></main></>}
