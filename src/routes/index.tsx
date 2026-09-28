import { createFileRoute } from "@tanstack/react-router";
import { useLayoutEffect, useRef } from "react";
import { JANHYANG_SHELL } from "@/janhyang-shell";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!node.querySelector("#map")) node.innerHTML = JANHYANG_SHELL;
    const w = window as Window & { __JH_SCRIPT__?: boolean };
    if (w.__JH_SCRIPT__) return;
    w.__JH_SCRIPT__ = true;
    const s = document.createElement("script");
    s.src = "/janhyang/engine.js";
    s.async = false;
    document.body.appendChild(s);
  }, []);

  return (
    <div
      ref={ref}
      className="stage"
      dangerouslySetInnerHTML={{ __html: JANHYANG_SHELL }}
    />
  );
}
