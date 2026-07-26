"use client";

import { useEffect, useState } from "react";
import styles from "./video-reference-preloader.module.css";

const labels = ["Let’s", "Build", "Good", "Companies"] as const;

export function VideoReferencePreloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    const timer = window.setTimeout(() => {
      setVisible(false);
      document.documentElement.style.overflow = previousOverflow;
    }, 2200);

    return () => {
      window.clearTimeout(timer);
      document.documentElement.style.overflow = previousOverflow;
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={styles.preloader} role="status" aria-label="Loading SoftBridge Solutions">
      <div className={styles.stack} aria-hidden="true">
        <span className={`${styles.motionLine} ${styles.motionLineTop}`} />
        {labels.map((label, index) => (
          <div
            className={`${styles.pill} ${styles[`pill${index + 1}`]}`}
            key={label}
          >
            {label}
          </div>
        ))}
        <span className={`${styles.motionLine} ${styles.motionLineBottom}`} />
      </div>
    </div>
  );
}
