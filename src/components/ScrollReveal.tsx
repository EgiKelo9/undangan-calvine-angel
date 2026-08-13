"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: "fade-in-up" | "fade-in-down" | "fade-in";
  delay?: 100 | 200 | 300 | 400 | 500 | 700 | 0;
  className?: string;
  once?: boolean;
}

export default function ScrollReveal({
  children,
  animation = "fade-in-up",
  delay = 0,
  className = "",
  once = true,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [once]);

  const animationClass =
    animation === "fade-in-down"
      ? "animate-fade-in-down"
      : animation === "fade-in"
      ? "animate-fade-in"
      : "animate-fade-in-up";

  const delayClass = delay > 0 ? `delay-${delay}` : "";

  return (
    <div
      ref={ref}
      className={`${
        isVisible ? `${animationClass} ${delayClass}` : "opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}
