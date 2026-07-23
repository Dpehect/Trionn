'use client';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
export function PageTransition({children}:{children:React.ReactNode}){const path=usePathname();return <motion.div key={path} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:.45,ease:[.22,1,.36,1]}}>{children}</motion.div>}
