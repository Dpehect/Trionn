"use client";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

export function AccessibleCarouselControls({
  paused,
  onPrevious,
  onNext,
  onTogglePause,
}: {
  paused: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onTogglePause: () => void;
}) {
  const button = "grid h-11 w-11 place-items-center rounded-full border hairline";
  return (
    <div className="flex gap-2" aria-label="Carousel controls">
      <button className={button} onClick={onPrevious} aria-label="Previous slide"><ChevronLeft size={17}/></button>
      <button className={button} onClick={onTogglePause} aria-label={paused ? "Resume carousel" : "Pause carousel"}>
        {paused ? <Play size={17}/> : <Pause size={17}/>}
      </button>
      <button className={button} onClick={onNext} aria-label="Next slide"><ChevronRight size={17}/></button>
    </div>
  );
}
