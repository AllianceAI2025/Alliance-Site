import React, { useEffect, useRef } from "react";
import posthog from "posthog-js";

const token = import.meta.env.VITE_POSTHOG_PROJECT_TOKEN;
const host = import.meta.env.VITE_POSTHOG_HOST || "https://us.i.posthog.com";
let started = false;

export function getPageName() {
  const path = (typeof window === "undefined" ? "" : window.location.pathname).replace(/\/+$/, "") || "/";
  if (path === "/") return "home";
  if (path.startsWith("/allianceone") || path.startsWith("/platform")) return "allianceone";
  if (path.startsWith("/how-it-works")) return "how_it_works";
  if (path.startsWith("/security")) return "security";
  if (path.startsWith("/company")) return "home";
  return path.replace(/^\//, "") || "home";
}

export function initAnalytics() {
  if (started || typeof window === "undefined" || !token) return;
  started = true;
  posthog.init(token, {
    api_host: host,
    defaults: "2026-05-30",
    person_profiles: "always",
    autocapture: false,
    capture_pageview: true,
    capture_pageleave: true,
    disable_session_recording: true,
    persistence: "localStorage+cookie",
    loaded: (client) => {
      client.register({ page: getPageName() });
    },
  });
}

export function capture(event, properties) {
  if (!token || !started) return;
  posthog.capture(event, { page: getPageName(), ...properties });
}

export function identifyVisitor(email, properties) {
  if (!token || !started || !email) return;
  posthog.identify(email, properties);
}

function useDwell(eventViewed, eventTime, properties) {
  const ref = useRef(null);
  const enteredAt = useRef(null);
  const propsRef = useRef(properties);
  propsRef.current = properties;

  useEffect(() => {
    const node = ref.current;
    if (!node || !token) return undefined;

    const flush = (reason) => {
      if (!enteredAt.current) return;
      const duration_ms = Date.now() - enteredAt.current;
      enteredAt.current = null;
      capture(eventTime, { ...propsRef.current, duration_ms, reason });
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (enteredAt.current) return;
        enteredAt.current = Date.now();
        capture(eventViewed, propsRef.current);
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
  }, [eventViewed, eventTime, properties.section, properties.scene]);

  return ref;
}

export function useVisualDwell(scene) {
  return useDwell("product_visual_viewed", "product_visual_time", { scene });
}

export function Track({ name, as: Tag = "section", children, ...props }) {
  const ref = useDwell("section_viewed", "section_time", { section: name });
  return <Tag ref={ref} {...props}>{children}</Tag>;
}
