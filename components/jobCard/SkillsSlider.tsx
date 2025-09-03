"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type SkillsSliderprops = {
  skills: string[];
};

export default function SkillSlider({ skills }: SkillsSliderprops) {
  const listRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [translateX, setTranslateX] = useState(0);
  const [maxTranslate, setMaxTranslate] = useState(0);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const list = listRef.current;
    if (!wrapper || !list) return;

    const wrapperW = wrapper.clientWidth;
    const listW = list.scrollWidth;

    if (listW <= wrapperW) {
      // no scrolling needed
      setMaxTranslate(0);
      setTranslateX(0);
    } else {
      setMaxTranslate(listW - wrapperW);
    }
  }, []);

  const step = 200; // pixels per click

  const handleLeft = () => {
    setTranslateX((prev) => Math.min(prev + step, 0));
  };

  const handleRight = () => {
    setTranslateX((prev) => Math.max(prev - step, -maxTranslate));
  };

  const atStart = translateX === 0;
  const atEnd = translateX === -maxTranslate;
  const noScroll = maxTranslate === 0;

  return (
    <div className="mt-5 flex items-center gap-2">
      {/* Left button  */}
      {!noScroll && !atStart && (
        <button onClick={handleLeft} className="p-1">
          <ChevronLeft />
        </button>
      )}

      {/* scrollable skills */}
      <div ref={wrapperRef} className="overflow-hidden flex-1">
        <div
          ref={listRef}
          className="list-none flex items-center gap-5 transition-transform duration-300"
          style={{ transform: `translateX(${translateX}px)` }}
        >
          {skills.map((skill, i) => (
            <li
              key={i}
              className="bg-gray-100 text-sm  group-hover:bg-gray-300 text-gray-600 rounded-2xl px-4  list-none duration-300"
              style={{ flex: "0 0 auto" }}
            >
              {skill}
            </li>
          ))}
        </div>
      </div>

      {/* Right button */}
      {!noScroll && !atEnd && (
        <button onClick={handleRight} className="p-1">
          <ChevronRight />
        </button>
      )}
    </div>
  );
}
