"use client";
import { createContext,useContext,useRef } from "react";
import { useScroll,useMotionValueEvent } from "framer-motion";

const SceneProgressContext=createContext({current:0});
export function SceneProgressProvider({children}:{children:React.ReactNode}){
  const progress=useRef({current:0});
  const {scrollYProgress}=useScroll();
  useMotionValueEvent(scrollYProgress,"change",value=>{progress.current.current=value;});
  return <SceneProgressContext.Provider value={progress.current}>{children}</SceneProgressContext.Provider>;
}
export function useSceneProgress(){return useContext(SceneProgressContext);}
