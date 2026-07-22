"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { useSound } from "@/hooks/use-sound";

export function SoundLink(props: ComponentProps<typeof Link>) {
  const { play } = useSound();

  return (
    <Link
      {...props}
      onMouseEnter={(event) => {
        play("hover");
        props.onMouseEnter?.(event);
      }}
    />
  );
}
