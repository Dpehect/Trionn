"use client";
import { useEffect, useState } from "react";

export function useMobileExperience() {
  const [mobile, setMobile] = useState(false);
  const [coarse, setCoarse] = useState(false);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const coarseQuery = window.matchMedia("(pointer: coarse)");
    const update = () => {
      setMobile(mobileQuery.matches);
      setCoarse(coarseQuery.matches);
    };
    update();
    mobileQuery.addEventListener("change", update);
    coarseQuery.addEventListener("change", update);
    return () => {
      mobileQuery.removeEventListener("change", update);
      coarseQuery.removeEventListener("change", update);
    };
  }, []);

  return { mobile, coarse, touchOptimized: mobile || coarse };
}
