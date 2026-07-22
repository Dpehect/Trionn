"use client";
import { useEffect } from "react";
export function Analytics(){useEffect(()=>{if(process.env.NEXT_PUBLIC_ENABLE_ANALYTICS!=="true")return;console.info("Analytics adapter enabled. Connect your provider here.")},[]);return null}
