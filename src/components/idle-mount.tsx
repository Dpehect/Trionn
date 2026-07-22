"use client";

import { useEffect, useState, type ReactNode } from "react";

type IdleWindow = Window & {
  requestIdleCallback?: (
    callback: IdleRequestCallback,
    options?: IdleRequestOptions
  ) => number;
  cancelIdleCallback?: (handle: number) => void;
};

export function IdleMount({
  children,
  fallback = null,
}: {
  children: ReactNode;
  fallback?: ReactNode;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const run = () => setReady(true);
    const browserWindow = window as IdleWindow;

    if (
      typeof browserWindow.requestIdleCallback === "function" &&
      typeof browserWindow.cancelIdleCallback === "function"
    ) {
      const idleId = browserWindow.requestIdleCallback(run, {
        timeout: 1200,
      });

      return () => browserWindow.cancelIdleCallback?.(idleId);
    }

    const timeoutId = globalThis.setTimeout(run, 300);
    return () => globalThis.clearTimeout(timeoutId);
  }, []);

  return ready ? children : fallback;
}
