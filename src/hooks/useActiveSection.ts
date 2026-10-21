import { useEffect, useRef, useState } from "react";

export function useActiveSection<T extends HTMLElement>(count: number) {
  const refs = useRef<Array<T | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = refs.current.findIndex((el) => el === entry.target);
            if (index !== -1) setActiveIndex(index);
          }
        });
      },
      { threshold: 0.55 },
    );

    refs.current.slice(0, count).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [count]);

  const setRef = (index: number) => (el: T | null) => {
    refs.current[index] = el;
  };

  return { activeIndex, setRef, scrollToIndex: (index: number) => refs.current[index]?.scrollIntoView({ behavior: "smooth" }) };
}
