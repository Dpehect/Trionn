"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./intro-audience-section.module.css";

type AudienceKey =
  | "anyone"
  | "recruiters"
  | "designers"
  | "managers"
  | "engineers";

type AudienceItem = {
  key: AudienceKey;
  label: string;
  copy: string;
};

const audiences: AudienceItem[] = [
  {
    key: "anyone",
    label: "For anyone",
    copy:
      "We're SoftBridge Solutions — a Finland-focused digital product team blending strategy, design, software engineering and practical AI into experiences that feel clear, useful and genuinely human.",
  },
  {
    key: "recruiters",
    label: "Recruiters",
    copy:
      "We're a multidisciplinary product and engineering team working across brand, product and technology. We care about craft, speed, ownership and shipping work people actually value.",
  },
  {
    key: "designers",
    label: "Product Designers",
    copy:
      "We work inside the messy middle — researching, sketching, prototyping and pairing closely to turn ambiguity into something real. We share early, iterate fast and protect the quality of every interaction.",
  },
  {
    key: "managers",
    label: "Product Managers",
    copy:
      "We connect design and engineering to outcomes — scoping tightly, prototyping to reduce risk and shipping in focused increments. We think in tradeoffs and care about measurable impact as much as pixels.",
  },
  {
    key: "engineers",
    label: "Engineers",
    copy:
      'We are highly technical without losing the human perspective. We can move fluently across product thinking, frontend systems, cloud architecture, APIs, AI workflows and the details that make software reliable.',
  },
];

function Word({
  value,
  index,
  activeIndex,
  wordRef,
}: {
  value: string;
  index: number;
  activeIndex: number | null;
  wordRef: (node: HTMLSpanElement | null) => void;
}) {
  const isActive = activeIndex === index;
  const isMuted = activeIndex !== null && activeIndex !== index;

  return (
    <span
      ref={wordRef}
      className={[
        styles.word,
        isActive ? styles.wordActive : "",
        isMuted ? styles.wordMuted : "",
      ].join(" ")}
      style={{ "--word-index": index } as React.CSSProperties}
    >
      {value}
    </span>
  );
}

export function IntroAudienceSection() {
  const [activeKey, setActiveKey] = useState<AudienceKey>("anyone");
  const [activeWord, setActiveWord] = useState<number | null>(null);
  const [pointerInside, setPointerInside] = useState(false);
  const [pointerDown, setPointerDown] = useState(false);

  const textAreaRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const pointerRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number | null>(null);

  const activeAudience =
    audiences.find((item) => item.key === activeKey) ?? audiences[0];

  const words = useMemo(
    () => activeAudience.copy.trim().split(/\s+/),
    [activeAudience.copy],
  );

  useEffect(() => {
    wordRefs.current = [];
    setActiveWord(null);
  }, [activeKey]);

  const updateProximity = useCallback(() => {
    const { x, y } = pointerRef.current;
    let nearestIndex: number | null = null;
    let nearestDistance = 118;

    wordRefs.current.forEach((node, index) => {
      if (!node) return;

      const rect = node.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.hypot(centerX - x, centerY - y);

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    setActiveWord(nearestIndex);
    frameRef.current = null;
  }, []);

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    pointerRef.current = { x: event.clientX, y: event.clientY };

    event.currentTarget.style.setProperty(
      "--cursor-x",
      `${event.clientX}px`,
    );
    event.currentTarget.style.setProperty(
      "--cursor-y",
      `${event.clientY}px`,
    );

    if (frameRef.current === null) {
      frameRef.current = requestAnimationFrame(updateProximity);
    }
  };

  const onPointerLeave = () => {
    setPointerInside(false);
    setPointerDown(false);
    setActiveWord(null);
  };

  useEffect(
    () => () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    },
    [],
  );

  return (
    <section id="about" className={styles.section}>
      <div className={styles.shell}>
        <aside className={styles.sidebar}>
          <p className={styles.sectionIndex}>03 / ABOUT</p>
          <h2 className={styles.title}>Intro</h2>

          <nav className={styles.navigation} aria-label="Intro audiences">
            {audiences.map((item) => {
              const selected = item.key === activeKey;

              return (
                <button
                  key={item.key}
                  type="button"
                  className={[
                    styles.navButton,
                    selected ? styles.navButtonActive : "",
                  ].join(" ")}
                  aria-pressed={selected}
                  onClick={() => setActiveKey(item.key)}
                >
                  <span className={styles.navLine} aria-hidden="true" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        <div className={styles.cardWrap}>
          <article className={styles.card}>
            <div className={styles.dotGrid} aria-hidden="true" />
            <div className={styles.fold} aria-hidden="true" />

            <div
              key={activeKey}
              ref={textAreaRef}
              className={[
                styles.textArea,
                pointerInside ? styles.textAreaInteractive : "",
              ].join(" ")}
              onPointerEnter={() => setPointerInside(true)}
              onPointerMove={onPointerMove}
              onPointerLeave={onPointerLeave}
              onPointerDown={() => setPointerDown(true)}
              onPointerUp={() => setPointerDown(false)}
            >
              <p className={styles.copy}>
                {words.map((word, index) => (
                  <Word
                    key={`${activeKey}-${index}-${word}`}
                    value={word}
                    index={index}
                    activeIndex={activeWord}
                    wordRef={(node) => {
                      wordRefs.current[index] = node;
                    }}
                  />
                ))}
              </p>

              <div
                className={[
                  styles.customCursor,
                  pointerInside ? styles.customCursorVisible : "",
                  pointerDown ? styles.customCursorDown : "",
                ].join(" ")}
                aria-hidden="true"
              >
                <span className={styles.cursorDot} />
                <svg
                  className={styles.cursorHand}
                  viewBox="0 0 28 28"
                  fill="none"
                >
                  <path
                    d="M10.2 14.2V5.8a2 2 0 1 1 4 0v5.1-2.5a2 2 0 1 1 4 0v3.4-1.8a2 2 0 1 1 4 0v6.2c0 5.2-3.2 8-8.1 8h-1.5c-3 0-4.5-1.1-6-3.4l-2.3-3.5a2.2 2.2 0 0 1 3.5-2.7l2.4 2.1"
                    stroke="currentColor"
                    strokeWidth="1.55"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <footer className={styles.cardFooter}>
              <span>{activeAudience.label}</span>
              <span>SOFTBRIDGE SOLUTIONS · FINLAND</span>
            </footer>
          </article>
        </div>
      </div>
    </section>
  );
}
