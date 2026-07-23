"use client";

import { Html, RoundedBox } from "@react-three/drei";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";
import { usePointerMotion } from "@/hooks/use-pointer-motion";

const silver = new THREE.MeshStandardMaterial({ color: "#d8d4d1", metalness: .72, roughness: .24 });
const chrome = new THREE.MeshStandardMaterial({ color: "#3b3b3b", metalness: .92, roughness: .18 });
const black = new THREE.MeshStandardMaterial({ color: "#151515", metalness: .58, roughness: .28 });

function Clamp({ y }: { y: number }) {
  return <group position={[0,y,0]}><mesh material={chrome}><torusGeometry args={[.255,.035,12,48]}/></mesh><mesh rotation={[0,0,Math.PI/2]} position={[.28,0,0]} material={black}><boxGeometry args={[.07,.18,.09]}/></mesh></group>;
}

function Board({ position, rotation=[0,0,0], size=[2.35,.58,.12], color, children, arrow=false }: { position:[number,number,number]; rotation?:[number,number,number]; size?:[number,number,number]; color:string; children:React.ReactNode; arrow?:boolean }) {
  return <group position={position} rotation={rotation}>
    <RoundedBox args={size} radius={.055} smoothness={5}><meshStandardMaterial color={color} roughness={.38}/></RoundedBox>
    {arrow && <mesh position={[-size[0]/2-.18,0,0]} rotation={[0,0,Math.PI/4]}><boxGeometry args={[.37,.37,size[2]]}/><meshStandardMaterial color={color}/></mesh>}
    <Html transform center position={[0,0,.071]} distanceFactor={5.1} style={{pointerEvents:"none"}}><div className="road-board-label">{children}</div></Html>
  </group>;
}

function TrafficLight({ position, rotation=[0,0,0] }: { position:[number,number,number]; rotation?:[number,number,number] }) {
  return <group position={position} rotation={rotation}>
    <mesh position={[0,.95,-.08]} material={chrome}><cylinderGeometry args={[.055,.055,1.15,16]}/></mesh>
    <RoundedBox args={[.62,1.5,.52]} radius={.14} smoothness={5} material={black}/>
    {[.48,0,-.48].map((y,i)=><group key={y} position={[0,y,.29]}><mesh rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.205,.205,.09,32]}/><meshStandardMaterial color="#232323"/></mesh><mesh position={[0,0,.052]}><circleGeometry args={[.145,32]}/><meshStandardMaterial color={["#a53c32","#8d7925","#2c6848"][i]} emissive={i===1?"#8d7925":"#000"} emissiveIntensity={i===1?.35:0}/></mesh></group>)}
  </group>;
}

function RoundSign() {
  return <group position={[-.56,.62,.18]} rotation={[0,.08,-.02]}>
    <mesh><cylinderGeometry args={[1.02,1.02,.11,64]}/><meshStandardMaterial color="#b7d7dc" roughness={.35}/></mesh>
    <mesh position={[0,0,.061]}><ringGeometry args={[.94,1.02,64]}/><meshStandardMaterial color="#242424"/></mesh>
    <Html transform center position={[0,0,.078]} distanceFactor={4.8} style={{pointerEvents:"none"}}><div className="round-sign-art"><span className="round-sign-face">◎◎</span><b>CREATIVE<br/>DEVELOPER</b><small>PORTFOLIO 2026</small></div></Html>
  </group>;
}

export function SignpostModel() {
  const group=useRef<THREE.Group>(null); const pointer=usePointerMotion(); const [drag,setDrag]=useState(false); const dragY=useRef(0);
  useFrame((state,delta)=>{if(!group.current)return; const ty=-.19+pointer.current.x*.105+dragY.current; const tx=-.025+pointer.current.y*.018; group.current.rotation.y=THREE.MathUtils.damp(group.current.rotation.y,ty,4,delta); group.current.rotation.x=THREE.MathUtils.damp(group.current.rotation.x,tx,4,delta); group.current.position.y=Math.sin(state.clock.elapsedTime*.55)*.018;});
  const move=(e:ThreeEvent<PointerEvent>)=>{if(drag)dragY.current+=e.movementX*.0025};
  return <group ref={group} scale={1.18} rotation={[-.025,-.19,-.012]} position={[.08,-.08,0]} onPointerDown={e=>{e.stopPropagation();setDrag(true)}} onPointerUp={()=>setDrag(false)} onPointerOut={()=>setDrag(false)} onPointerMove={move}>
    <mesh position={[0,-.55,0]} material={silver}><cylinderGeometry args={[.205,.24,7.2,48]}/></mesh>
    <Clamp y={2.08}/><Clamp y={.92}/><Clamp y={-.42}/>
    <mesh position={[0,2.66,0]} material={chrome}><torusGeometry args={[.255,.035,12,48]}/></mesh>
    <Board position={[-1.05,2.35,.05]} rotation={[0,.06,.015]} color="#f3d620" arrow><span>CREATIVE DEVELOPER</span></Board>
    <Board position={[-1.08,1.52,.18]} rotation={[0,.1,-.01]} size={[1.72,.82,.11]} color="#ffffff" arrow><span className="jp">コンタクト</span><em>CONTACT</em></Board>
    <RoundSign/>
    <Board position={[-1.18,-.72,.08]} rotation={[0,.08,.01]} size={[2.7,.48,.1]} color="#1741bc" arrow><span>PROJECTS ARCHIVE / PROJECTS</span></Board>
    <Board position={[1.08,-1.48,-.12]} rotation={[0,-.2,-.02]} size={[2.12,.42,.1]} color="#1741bc"><span>ABOUT / PROFILE →</span></Board>
    <TrafficLight position={[.58,-.36,.15]} rotation={[0,-.12,0]}/>
    <mesh position={[.46,1.38,-.02]} material={chrome}><torusGeometry args={[.65,.055,16,64]}/></mesh>
  </group>;
}
