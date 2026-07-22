"use client";

import {
  type ButtonHTMLAttributes,
  useRef,
} from "react";
import gsap from "gsap";

type MagneticButtonProps =
  ButtonHTMLAttributes<HTMLButtonElement>;

export function MagneticButton({
  children,
  className = "",
  onMouseMove,
  onMouseLeave,
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <button
      ref={buttonRef}
      className={`magnetic-button ${className}`}
      onMouseMove={(event) => {
        const button = buttonRef.current;
        if (!button) {
          return;
        }

        const bounds = button.getBoundingClientRect();
        const x =
          event.clientX - bounds.left - bounds.width / 2;
        const y =
          event.clientY - bounds.top - bounds.height / 2;

        gsap.to(button, {
          x: x * 0.18,
          y: y * 0.18,
          duration: 0.35,
          ease: "power3.out",
        });

        onMouseMove?.(event);
      }}
      onMouseLeave={(event) => {
        const button = buttonRef.current;

        if (button) {
          gsap.to(button, {
            x: 0,
            y: 0,
            duration: 0.55,
            ease: "elastic.out(1, 0.35)",
          });
        }

        onMouseLeave?.(event);
      }}
      {...props}
    >
      {children}
    </button>
  );
}
