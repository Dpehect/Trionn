"use client";

import { useCallback, useEffect } from "react";
import { audioManager } from "@/lib/audio-manager";
import { useExperienceStore } from "@/store/experience-store";

export function useSound() {
  const sound = useExperienceStore((state) => state.sound);
  const setSound = useExperienceStore((state) => state.setSound);

  useEffect(() => {
    const saved = localStorage.getItem("atelier-sound");
    if (saved === "on") setSound(true);
  }, [setSound]);

  useEffect(() => {
    if (sound) {
      audioManager.initialize().then(() => audioManager.enable());
      localStorage.setItem("atelier-sound", "on");
    } else {
      audioManager.disable();
      localStorage.setItem("atelier-sound", "off");
    }
  }, [sound]);

  const play = useCallback(
    (name: Parameters<typeof audioManager.play>[0]) => {
      if (sound) audioManager.play(name);
    },
    [sound]
  );

  return { sound, setSound, play };
}
