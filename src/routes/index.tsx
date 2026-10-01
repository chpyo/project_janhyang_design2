import { createFileRoute } from "@tanstack/react-router";
import { useLayoutEffect, useRef } from "react";
import { JANHYANG_SHELL } from "@/janhyang-shell";

export const Route = createFileRoute("/")({ component: Home });

// 플랫폼 모듈은 객체 정의만 하고, engine.js가 마지막에 로드되며 init()을 돈다.
const SCRIPTS = [
  "context",
  "sky",
  "presence",
  "access",
  "content",
  "safety",
  "metrics",
  "discover",
  "play",
  "stage",
  "permit",
  "feed",
  "archive",
  "clip",
  "native",
  "platform",
  "selftest",
].map((name) => `/janhyang/platform/${name}.js`).concat("/janhyang/engine.js");

function Home() {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!node.querySelector("#map")) node.innerHTML = JANHYANG_SHELL;
    const w = window as Window & { __JH_SCRIPT__?: boolean };
    if (w.__JH_SCRIPT__) return;
    w.__JH_SCRIPT__ = true;
    for (const src of SCRIPTS) {
      const s = document.createElement("script");
      s.src = src;
      s.async = false;
      document.body.appendChild(s);
    }
  }, []);

  return (
    <div
      ref={ref}
      className="stage"
      dangerouslySetInnerHTML={{ __html: JANHYANG_SHELL }}
    />
  );
}
