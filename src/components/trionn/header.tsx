"use client";
import Link from "next/link";
import { useState } from "react";

export function TrionnHeader(){
 const [open,setOpen]=useState(false);
 return <>
  <header className="trionn-header">
    <Link href="/" className="trionn-logo" aria-label="TRIONN home">TRI<span>O</span>NN</Link>
    <div className="trionn-header-meta"><span>Creative technology studio</span><span>IST / Worldwide</span></div>
    <button className="trionn-menu-button" onClick={()=>setOpen(true)}><i/><i/>MENU</button>
  </header>
  <div className={`trionn-menu ${open?"is-open":""}`} aria-hidden={!open}>
    <button className="trionn-menu-close" onClick={()=>setOpen(false)}>CLOSE ×</button>
    <nav>{[["01","WORK","/work"],["02","STUDIO","/studio"],["03","CONTACT","/contact"]].map(([n,l,h])=><Link key={l} href={h} onClick={()=>setOpen(false)}><small>{n}</small><span>{l}</span></Link>)}</nav>
    <div className="trionn-menu-foot"><span>New business</span><a href="mailto:hello@trionn.studio">hello@trionn.studio</a></div>
  </div>
 </>;
}
