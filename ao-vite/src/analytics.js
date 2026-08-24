import { useEffect, useRef } from "react";
import posthog from "posthog-js";

const token = import.meta.env.VITE_POSTHOG_PROJECT_TOKEN;
const host = import.meta.env.VITE_POSTHOG_HOST || "https://us.i.posthog.com";
let started = false;

export function initAnalytics() {
  if (started || typeof window === "undefined" || !token) return;
  started = true;
  posthog.init(token, {
    api_host: host,
    defaults: "2026-05-30",
    autocapture: false,
    capture_pageview: true,
    capture_pageleave: true,
    disable_session_recording: true,
    persistence: "localStorage+cookie",
  });
}

export function capture(event, properties) {
  if (!token || !started) return;
  posthog.capture(event, properties);
}

export function useVisualDwell(scene) {
  const ref = useRef(null);
  const enteredAt = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || !token) return undefined;

    const flush = (reason) => {
      if (!enteredAt.current) return;
      const duration_ms = Date.now() - enteredAt.current;
      enteredAt.current = null;
      capture("product_visual_time", { scene, duration_ms, reason });
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (enteredAt.current) return;
        enteredAt.current = Date.now();
        capture("product_visual_viewed", { scene });
        return;
      }
      flush("scrolled_away");
    }, { threshold: 0.28, rootMargin: "0px 0px -12% 0px" });

    observer.observe(node);
    const onHide = () => {
      if (document.visibilityState === "hidden") flush("page_hidden");
    };
    document.addEventListener("visibilitychange", onHide);
    window.addEventListener("pagehide", onHide);
    return () => {
      flush("unmount");
      observer.disconnect();
      document.removeEventListener("visibilitychange", onHide);
      window.removeEventListener("pagehide", onHide);
    };
  }, [scene]);

  return ref;
}
